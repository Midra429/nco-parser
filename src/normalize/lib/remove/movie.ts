export const REGEXPS = [/\s+(吹き?替え?|字幕)版?$/]

export const movie = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, '')
  }

  return str.trim()
}
