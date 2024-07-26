import { REGULAR_CHARS as SYMBOL_REGULAR_CHARS } from '../adjust/symbol.js'

export const CHARACTERS = Object.values(SYMBOL_REGULAR_CHARS)

export const symbol = (str: string): string => {
  for (const char of CHARACTERS) {
    str = str.replaceAll(char, ' ')
  }

  str = str.replaceAll('|', ' ')

  return str.replace(/\s+/g, ' ').trim()
}
