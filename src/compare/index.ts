import type { Extracted } from '../extract/index.js'

import { normalizeAll } from '../normalize/index.js'
import { extract } from '../extract/index.js'
import { similarity } from '../utils/similarity.js'

export const compare = (
  targetA: string | Extracted,
  targetB: string | Extracted,
  strict?: boolean
): boolean => {
  const extractedA = typeof targetA === 'string' ? extract(targetA) : targetA
  const extractedB = typeof targetB === 'string' ? extract(targetB) : targetB

  if (!extractedA.title || !extractedB.title) {
    return false
  }

  if (
    normalizeAll(extractedA.normalized) === normalizeAll(extractedB.normalized)
  ) {
    return true
  }

  const normalizedTitleA = normalizeAll(extractedA.title)
  const normalizedTitleB = normalizeAll(extractedB.title)

  const normalizedSubtitleA =
    extractedA.subtitle && normalizeAll(extractedA.subtitle)
  const normalizedSubtitleB =
    extractedB.subtitle && normalizeAll(extractedB.subtitle)

  const isSameTitle = normalizedTitleA === normalizedTitleB

  const isSameSeasonNumber =
    extractedA.season?.number === extractedB.season?.number ||
    (!extractedA.season && extractedB.season?.number === 1) ||
    (extractedA.season?.number === 1 && !extractedB.season)

  const isSameEpisodeNumber =
    extractedA.episode?.number === extractedB.episode?.number

  const isSameSubtitle = normalizedSubtitleA === normalizedSubtitleB

  if (
    isSameTitle &&
    isSameSeasonNumber &&
    isSameEpisodeNumber &&
    isSameSubtitle
  ) {
    return true
  }

  const isSimilarTitle =
    isSameTitle || 0.85 <= similarity(normalizedTitleA, normalizedTitleB)

  const isSimilarSubtitle =
    isSameSubtitle ||
    (!!normalizedSubtitleA &&
      !!normalizedSubtitleB &&
      0.85 <= similarity(normalizedSubtitleA, normalizedSubtitleB))

  if (
    isSimilarTitle &&
    isSameSeasonNumber &&
    isSameEpisodeNumber &&
    isSimilarSubtitle
  ) {
    return true
  }

  if (!strict) {
    if (
      isSimilarTitle &&
      extractedA.episode &&
      isSameEpisodeNumber &&
      (isSameSeasonNumber || isSimilarSubtitle)
    ) {
      return true
    }
  }

  return false
}
