export const REGEXPS = [
  /(amazon|アマゾン)?\s?(prime|プライム)[\s･]?(video|ビデオ)用?/gi,
]

export const vod = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, '')
  }

  return str.trim()
}
