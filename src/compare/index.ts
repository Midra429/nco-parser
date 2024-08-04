import { normalizeAll } from '../normalize/index.js'
import { extract } from '../extract/index.js'
import { similarity } from '../utils/similarity.js'

export const compare = (
  rawTextA: string,
  rawTextB: string,
  weak: boolean = true
): boolean => {
  if (normalizeAll(rawTextA) === normalizeAll(rawTextB)) {
    return true
  }

  const extractedA = extract(rawTextA)
  const extractedB = extract(rawTextB)

  if (!extractedA.title || !extractedB.title) {
    return false
  }

  const normalizedWorkTitleA = normalizeAll(extractedA.title)
  const normalizedWorkTitleB = normalizeAll(extractedB.title)

  const normalizedSubTitleA =
    extractedA.subtitle && normalizeAll(extractedA.subtitle)
  const normalizedSubTitleB =
    extractedB.subtitle && normalizeAll(extractedB.subtitle)

  const isSameWorkTitle = normalizedWorkTitleA === normalizedWorkTitleB

  const isSameSeasonNumber =
    extractedA.season?.number === extractedB.season?.number

  const isSameEpisodeNumber =
    extractedA.episode?.number === extractedB.episode?.number

  const isSameSubTitle = normalizedSubTitleA === normalizedSubTitleB

  if (
    isSameWorkTitle &&
    isSameSeasonNumber &&
    isSameEpisodeNumber &&
    isSameSubTitle
  ) {
    return true
  }

  if (weak) {
    const isSimilarWorkTitle =
      isSameWorkTitle ||
      0.85 <= similarity(normalizedWorkTitleA, normalizedWorkTitleB)

    const isSimilarSubTitle =
      isSameSubTitle ||
      (!!normalizedSubTitleA &&
        !!normalizedSubTitleB &&
        0.9 <= similarity(normalizedSubTitleA, normalizedSubTitleB))

    if (
      isSimilarWorkTitle &&
      isSameSeasonNumber &&
      isSameEpisodeNumber &&
      isSimilarSubTitle
    ) {
      return true
    }

    if (
      isSimilarWorkTitle &&
      extractedA.episode &&
      isSameEpisodeNumber &&
      (isSameSeasonNumber || isSimilarSubTitle)
    ) {
      return true
    }
  }

  return false
}
