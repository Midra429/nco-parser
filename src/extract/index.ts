import type { ExtractResult } from './lib/core.js'

import { normalize } from '../normalize/index.js'
import { season as extractSeason } from './lib/season.js'
import { episode as extractEpisode } from './lib/episode.js'

export type Extracted = {
  normalized: string
  title: string | null
  season: ExtractResult | null
  episode: ExtractResult | null
  subtitle: string | null
}

export const extract = (rawText: string): Extracted => {
  const normalized = normalize(rawText, {
    remove: {
      bracket: true,
    },
  })

  const seasons = extractSeason(normalized)
  let episodes = extractEpisode(normalized, true)

  let title: string | null = null
  let season: (typeof seasons)[number] | null = null
  let episode: (typeof episodes)[number] | null = null
  let subtitle: string | null = null

  let seasonLastIdx: number | null = null

  if (
    seasons.length &&
    seasons.every((v, i, a) => v.number === a.at(i - 1)!.number)
  ) {
    season = seasons[0]
    title = normalized.slice(0, season.range[0]).trim()

    seasonLastIdx = seasons.at(-1)!.range[1]
  }

  if (seasonLastIdx) {
    episodes = episodes.filter((v) => seasonLastIdx < v.range[0])
  }

  if (episodes.length) {
    episode = episodes[0]
    title ||= normalized.slice(0, episode.range[0]).trim()
    subtitle = normalized.slice(episode.range[1] + 1).trim()
  } else {
    episodes = extractEpisode(normalized)

    if (seasonLastIdx) {
      episodes = episodes.filter((v) => seasonLastIdx < v.range[0])
    }

    if (episodes.length) {
      episode = episodes[1] || episodes[0]
      title ||= normalized.slice(0, episode.range[0]).trim()
      subtitle = normalized.slice(episode.range[1] + 1).trim()
    }
  }

  return {
    normalized,
    title: title || null,
    season,
    episode,
    subtitle: subtitle || null,
  }
}
