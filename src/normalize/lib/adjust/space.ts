import { splitString } from '../../../utils/string.js'

const spaces = [
  0x00a0, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009,
  0x200a, 0x200b, 0x2060, 0x3000, 0xfeff, 0x0009,
]

export const REGULAR_CHAR = ' '

/**
 * スペースを統一
 */
export const space = (str: string): string => {
  const strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      if (spaces.includes(cp)) {
        ary[idx] = REGULAR_CHAR
      }
    }
  })

  return strAry.join('')
}
