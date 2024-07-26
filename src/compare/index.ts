import { normalizeAll } from '../normalize/index.js'
import { extract } from '../extract/index.js'
import { similarity } from '../utils/similarity.js'

export const compare = (
  titleA: string,
  titleB: string,
  weak: boolean = true
): boolean => {
  if (normalizeAll(titleA) === normalizeAll(titleB)) {
    return true
  }

  const extractedA = extract(titleA)
  const extractedB = extract(titleB)

  if (!extractedA.workTitle || !extractedB.workTitle) {
    return false
  }

  const normalizedWorkTitleA = normalizeAll(extractedA.workTitle)
  const normalizedWorkTitleB = normalizeAll(extractedB.workTitle)

  const normalizedSubTitleA =
    extractedA.subTitle && normalizeAll(extractedA.subTitle)
  const normalizedSubTitleB =
    extractedB.subTitle && normalizeAll(extractedB.subTitle)

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
