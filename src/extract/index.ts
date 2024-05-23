import { normalize } from '../normalize'
import { season as extractSeason } from './lib/season'
import { episode as extractEpisode } from './lib/episode'

export const extract = (rawText: string) => {
  const normalized = normalize(rawText, { bracket: true })

  const seasons = extractSeason(normalized)
  const episodes = extractEpisode(normalized)

  let season: (typeof seasons)[number] | null = null
  let episode: (typeof episodes)[number] | null = null
  let workTitle: string | null = null
  let subTitle: string | null = null

  if (0 < episodes.length) {
    episode = episodes[0]

    workTitle = normalized.slice(0, episode.range[0]).trim()
    subTitle = normalized.slice(episode.range[1] + 1).trim()
  }

  if (
    0 < seasons.length &&
    seasons.every((v, i, a) => v.number === a.at(i - 1)!.number)
  ) {
    if (!episode || seasons.every((v) => v.range[1] < episode.range[0])) {
      season = seasons[0]

      workTitle = normalized.slice(0, season.range[0]).trim()
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
