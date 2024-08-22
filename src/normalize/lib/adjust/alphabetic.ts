import { splitString } from '../../../utils/string.js'

// 括弧付きラテン文字 (a〜z)
const PARENTHESIZED_LATIN_LETTERS = Array(26)
  .fill(0)
  .map((_, i) => i + 0x249c)

// 丸付きラテン文字 (A〜Z)
const CIRCLED_LATIN_LETTERS_UPPER = Array(26)
  .fill(0)
  .map((_, i) => i + 0x24b6)

// 丸付きラテン文字 (a〜z)
const CIRCLED_LATIN_LETTERS_LOWER = Array(26)
  .fill(0)
  .map((_, i) => i + 0x24d0)

/**
 * アルファベットを統一
 */
export const alphabetic = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      let index: number = -1

      // a〜z
      index = Math.max(index, PARENTHESIZED_LATIN_LETTERS.indexOf(cp))
      index = Math.max(index, CIRCLED_LATIN_LETTERS_LOWER.indexOf(cp))

      if (index !== -1) {
        ary[idx] = String.fromCodePoint(0x0061 + index)

        return
      }

      // A〜Z
      index = Math.max(index, CIRCLED_LATIN_LETTERS_UPPER.indexOf(cp))

      if (index !== -1) {
        ary[idx] = String.fromCodePoint(0x0041 + index)

        return
      }
    }
  })

  return strAry.join('')
}
