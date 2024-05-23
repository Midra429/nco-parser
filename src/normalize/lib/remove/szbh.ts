export const REGEXPS = [
  /コメント専?用(動画)?|szbh方式/gi,
  /\s+(dvd|(blu[\s\-]?ray|ブルーレイ))用|dvd\/(blu[\s\-]?ray|ブルーレイ)用?/gi,
]

export const szbh = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, '')
  }

  return str.trim()
}
