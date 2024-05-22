import { splitString } from '../../../utils/string'
import { numToRoman } from '../../../utils/numToRoman'

const DECIMAL_LCDM = [50, 100, 500, 1000]

/**
 * ローマ数字専用の符号 → ラテン文字に統一
 * @example
 * 'Ⅰ' → 'I'
 * 'Ⅳ' → 'IV'
 */
export const romanNum = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      const isUpper = 0x2160 <= cp && cp <= 0x216f
      const isLower = 0x2170 <= cp && cp <= 0x217f

      let num: number | null = null

      if (isUpper) {
        // Ⅰ 〜 Ⅻ
        if (cp <= 0x216b) {
          num = cp - 0x2160 + 1
        }
        // Ⅼ 〜 Ⅿ
        else if (0x216c <= cp) {
          num = DECIMAL_LCDM[cp - 0x216c]
        }
      } else if (isLower) {
        // ⅰ 〜 ⅻ
        if (cp <= 0x217b) {
          num = cp - 0x2170 + 1
        }
        // ⅼ 〜 ⅿ
        else if (0x217c <= cp) {
          num = DECIMAL_LCDM[cp - 0x217c]
        }
      }

      if (num !== null) {
        ary[idx] = numToRoman(num, isLower)
      }
    }
  })

  return strAry.join('')
}
