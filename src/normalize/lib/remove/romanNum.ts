import { splitString } from '../../../utils/string.js'

const ROMAN_NUM_REGEXP =
  /M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/dg

export const romanNum = (str: string): string => {
  let strAry = splitString(str)

  strAry.forEach((char, idx, ary) => {
    if (char.length === 1) {
      const cp = char.codePointAt(0)!

      if (0x2160 <= cp && cp <= 0x217f) {
        ary[idx] = ' '
      }
    }
  })

  strAry = [...strAry.join('')]

  for (const matched of str.matchAll(ROMAN_NUM_REGEXP)) {
    if (!matched[0]) continue

    const [start, end] = matched.indices![0]

    strAry.splice(start, end - start, ' ')
  }

  str = strAry.join('')

  return str.replace(/\s+/g, ' ').trim()
}
