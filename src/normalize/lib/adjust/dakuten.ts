import { splitString } from '../../../utils/string'

const dakutens = [0x3099, 0x309b, 0xff9e]
const handakutens = [0x309a, 0x309c, 0xff9f]

// か行
const kaColumn = [
  // ひらがな
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x304b + i * 2),
  // カタカナ
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x30ab + i * 2),
]

// さ行
const saColumn = [
  // ひらがな
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x3055 + i * 2),
  // カタカナ
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x30b5 + i * 2),
]

// た行
const taColumn = [
  // ひらがな
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x305f + i * 2 + (2 <= i ? 1 : 0)),
  // カタカナ
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x30bf + i * 2 + (2 <= i ? 1 : 0)),
]

// は行
const haColmun = [
  // ひらがな
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x306f + i * 3),
  // カタカナ
  ...Array(5)
    .fill(0)
    .map((_, i) => 0x30cf + i * 3),
]

/**
 * 濁点を統一
 */
export const dakuten = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 2) {
      const cpBase = char.codePointAt(0)!
      const cpMark = char.codePointAt(1)!

      if (
        dakutens.includes(cpMark) &&
        (kaColumn.includes(cpBase) ||
          saColumn.includes(cpBase) ||
          taColumn.includes(cpBase) ||
          haColmun.includes(cpBase))
      ) {
        ary[idx] = String.fromCodePoint(cpBase + 1)
      }
    }
  })

  return strAry.join('')
}

/**
 * 半濁点を統一
 */
export const handakuten = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 2) {
      const cpBase = char.codePointAt(0)!
      const cpMark = char.codePointAt(1)!

      if (handakutens.includes(cpMark) && haColmun.includes(cpBase)) {
        ary[idx] = String.fromCodePoint(cpBase + 2)
      }
    }
  })

  return strAry.join('')
}
