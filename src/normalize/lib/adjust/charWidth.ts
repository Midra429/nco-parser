import { splitString } from '../../../utils/string.js'

const SYMBOLS: Record<string, string> = {
  '！': '!',
  '？': '?',

  '「': '｢',
  '」': '｣',
  '〈': '<',
  '〉': '>',
}

/**
 * 全角を半角に統一
 */
export const charWidth = (str: string, symbol?: boolean): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      let newChar: string | null = null

      if (char in SYMBOLS) {
        if (symbol) {
          newChar = SYMBOLS[char]
        }
      } else if (0xff01 <= cp && cp <= 0xff5e) {
        newChar = String.fromCodePoint(cp - 0xfee0)
      } else if (char === '　') {
        newChar = ' '
      }

      if (newChar !== null) {
        ary[idx] = newChar
      }
    }
  })

  return strAry.join('')
}
