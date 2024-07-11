import { normalize } from '../normalize'
import { season as extractSeason } from './lib/season'
import { episode as extractEpisode } from './lib/episode'

export const extract = (rawText: string) => {
  const normalized = normalize(rawText, {
    remove: {
      bracket: true,
    },
  })

  const seasons = extractSeason(normalized)
  let episodes = extractEpisode(normalized, false)

  let season: (typeof seasons)[number] | null = null
  let episode: (typeof episodes)[number] | null = null
  let workTitle: string | null = null
  let subTitle: string | null = null

  let seasonLastIdx: number | null = null

  if (
    seasons.length &&
    seasons.every((v, i, a) => v.number === a.at(i - 1)!.number)
  ) {
    season = seasons[0]
    workTitle = normalized.slice(0, season.range[0]).trim()

    seasonLastIdx = seasons.at(-1)!.range[1]
  }

  if (seasonLastIdx) {
    episodes = episodes.filter((v) => seasonLastIdx < v.range[0])
  }

  if (episodes.length) {
    episode = episodes[0]
    workTitle ||= normalized.slice(0, episode.range[0]).trim()
    subTitle = normalized.slice(episode.range[1] + 1).trim()
  } else {
    episodes = extractEpisode(normalized)

    if (seasonLastIdx) {
      episodes = episodes.filter((v) => seasonLastIdx < v.range[0])
    }

    if (episodes.length) {
      episode = episodes.at(-1)!
      workTitle ||= normalized.slice(0, episode.range[0]).trim()
      subTitle = normalized.slice(episode.range[1] + 1).trim()
    }
  }

  return {
    normalized,
    season,
    episode,
    workTitle: workTitle || null,
    subTitle: subTitle || null,
  }
}
