import { normalizerAll } from '../normalizer'
import { extractor } from '../extractor'

export const compare = (
  titleA: string,
  titleB: string,
  weak: boolean = true
): boolean => {
  if (normalizerAll(titleA) === normalizerAll(titleB)) {
    return true
  }

  const extractedA = extractor(titleA)
  const extractedB = extractor(titleB)

  if (
    extractedA.workTitle === extractedB.workTitle &&
    extractedA.subTitle === extractedB.subTitle &&
    extractedA.season?.number === extractedB.season?.number &&
    extractedA.episode?.number === extractedA.episode?.number
  ) {
    return true
  }

  if (weak) {
    if (
      extractedA.episode &&
      extractedB.episode &&
      extractedA.workTitle === extractedB.workTitle &&
      extractedA.season?.number === extractedB.season?.number &&
      extractedA.episode.number === extractedB.episode.number
    ) {
      return true
    }
  }

  return false
}
