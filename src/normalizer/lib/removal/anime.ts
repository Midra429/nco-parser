export const REGEXPS = [
  /^(tv|テレビ)?アニメ(ーション)?\s+/i,
  /(?<=^\S+)\sthe\sanimation(?=[^a-z]|$)/i,
  /\s+本編$/,
]

export const anime = (str: string): string => {
  for (const re of REGEXPS) {
    str = str.replace(re, '')
  }

  // <映画タイトル> 本編 <映画タイトル> (dアニメストア)
  const splited = str.split(/\s+本編\s+/).map((v) => v.trim())
  if (splited.length === 2 && splited[0] === splited[1]) {
    str = splited[0]
  }

  return str.trim()
}
