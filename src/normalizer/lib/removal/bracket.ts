export const REGEXPS = [
  ['-', '-'],
  ['~', '~'],
  ['(', ')'],
  ['｢', '｣'],
  ['『', '』'],
  ['【', '】'],
  ['<', '>'],
  ['《', '》'],
  ['〔', '〕'],
  ['{', '}'],
  ['[', ']'],
].map((pair) => new RegExp(`\\${pair[0]}([^\\${pair[1]}]*)\\${pair[1]}`, 'g'))

export const bracket = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, ' $1 ')
  }

  return str.replace(/\s+/g, ' ').trim()
}
