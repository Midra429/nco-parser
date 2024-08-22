import { splitString } from '../../../utils/string.js'

// 丸付き数字 (1〜20)
const CIRCLED_NUMBERS = Array(20)
  .fill(0)
  .map((_, i) => i + 0x2460)

// 括弧付き数字 (1〜20)
const PARENTHESIZED_NUMBERS = Array(20)
  .fill(0)
  .map((_, i) => i + 0x2474)

// ピリオド付き数字 (1〜20)
const NUMBERS_PERIOD = Array(20)
  .fill(0)
  .map((_, i) => i + 0x2488)

// 追加丸付き数字 (0)
const ADDITIONAL_CIRCLED_NUMBER = 0x24ea

// 白抜き黒丸付き数字 (11〜20)
const WHITE_ON_BLACK_CIRCLED_NUMBERS = Array(10)
  .fill(0)
  .map((_, i) => i + 0x24eb)

// 二重丸付き数字 (1〜10)
const DOUBLE_CIRCLED_NUMBERS = Array(10)
  .fill(0)
  .map((_, i) => i + 0x24f5)

// 追加白抜き黒丸付き数字 (0)
const ADDITIONAL_WHITE_ON_BLACK_CIRCLED_NUMBER = 0x24ff

// 装飾丸付き数字 (黒丸) (1〜10)
const DINGBAT_CIRCLED_DIGITS_1 = Array(10)
  .fill(0)
  .map((_, i) => i + 0x2776)

// 装飾丸付き数字 (サンセリフ) (1〜10)
const DINGBAT_CIRCLED_DIGITS_2 = Array(10)
  .fill(0)
  .map((_, i) => i + 0x2780)

// 装飾丸付き数字 (サンセリフ・黒丸) (1〜10)
const DINGBAT_CIRCLED_DIGITS_3 = Array(10)
  .fill(0)
  .map((_, i) => i + 0x278a)

/**
 * 数字を統一
 */
export const numeric = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      // 0
      if (
        cp === ADDITIONAL_CIRCLED_NUMBER ||
        cp === ADDITIONAL_WHITE_ON_BLACK_CIRCLED_NUMBER
      ) {
        ary[idx] = '0'

        return
      }

      let index: number = -1

      // 1〜20
      index = Math.max(index, CIRCLED_NUMBERS.indexOf(cp))
      index = Math.max(index, PARENTHESIZED_NUMBERS.indexOf(cp))
      index = Math.max(index, NUMBERS_PERIOD.indexOf(cp))

      // 1〜10
      index = Math.max(index, DOUBLE_CIRCLED_NUMBERS.indexOf(cp))
      index = Math.max(index, DINGBAT_CIRCLED_DIGITS_1.indexOf(cp))
      index = Math.max(index, DINGBAT_CIRCLED_DIGITS_2.indexOf(cp))
      index = Math.max(index, DINGBAT_CIRCLED_DIGITS_3.indexOf(cp))

      if (index !== -1) {
        ary[idx] = (index + 1).toString()

        return
      }

      // 11〜20
      index = Math.max(index, WHITE_ON_BLACK_CIRCLED_NUMBERS.indexOf(cp))

      if (index !== -1) {
        ary[idx] = (index + 11).toString()

        return
      }
    }
  })

  return strAry.join('')
}
