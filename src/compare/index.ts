import { normalizeAll } from '../normalize/index.js'
import { extract } from '../extract/index.js'
import { similarity } from '../utils/similarity.js'

export const compare = (
  rawTextA: string,
  rawTextB: string,
  strict?: boolean
): boolean => {
  if (normalizeAll(rawTextA) === normalizeAll(rawTextB)) {
    return true
  }

  const extractedA = extract(rawTextA)
  const extractedB = extract(rawTextB)

  if (!extractedA.title || !extractedB.title) {
    return false
  }

  const normalizedTitleA = normalizeAll(extractedA.title)
  const normalizedTitleB = normalizeAll(extractedB.title)

  const normalizedSubtitleA =
    extractedA.subtitle && normalizeAll(extractedA.subtitle)
  const normalizedSubtitleB =
    extractedB.subtitle && normalizeAll(extractedB.subtitle)

  const isSameTitle = normalizedTitleA === normalizedTitleB

  const isSameSeasonNumber =
    extractedA.season?.number === extractedB.season?.number

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
      0.9 <= similarity(normalizedSubtitleA, normalizedSubtitleB))

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
