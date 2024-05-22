export const REGEXPS = [/\s/g]

export const space = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, '')
  }

  return str.trim()
}
