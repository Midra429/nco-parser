import { splitString } from '../../../utils/string.js'

const SYMBOLS: Record<string, string> = {
  '　': ' ',
  '「': '｢',
  '」': '｣',
  '〈': '<',
  '〉': '>',
}

/**
 * 全角を半角に統一
 */
export const charWidth = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      let newChar: string | null = null

      if (0xff01 <= cp && cp <= 0xff5e) {
        newChar = String.fromCodePoint(cp - 0xfee0)
      } else if (char in SYMBOLS) {
        newChar = SYMBOLS[char]
      }

      if (newChar !== null) {
        ary[idx] = newChar
      }
    }
  })

  return strAry.join('')
}
