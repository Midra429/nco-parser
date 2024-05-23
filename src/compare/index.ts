import { normalizeAll } from '../normalize'
import { extract } from '../extract'

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
