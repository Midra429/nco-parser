import { REGEXP_NUMBER, REGEXP_KANSUJI, core } from './_core.js'

const REGEXP_NUM_KANSUJI = `${REGEXP_NUMBER.source}|${REGEXP_KANSUJI.source}`

export const REGEXPS = [
  // 第2期, ニ期
  `(?<prefix>第?)(?<number>${REGEXP_NUM_KANSUJI})(?<suffix>期)`,

  // 第2シリーズ, 第2シーズン
  `(?<prefix>第)(?<number>${REGEXP_NUM_KANSUJI})(?<suffix>シリーズ|シーズン)`,

  // シーズン2
  `(?<prefix>シーズン)(?<number>${REGEXP_NUMBER.source})`,

  // season 2
  `(?<prefix>season\\s?)(?<number>${REGEXP_NUMBER.source})`,

  // 2nd season
  `(?<number>${REGEXP_NUMBER.source})(?<suffix>(?:st|nd|rd|th)\\sseason)`,
].map((v) => new RegExp(v, 'dgi'))

export const season = (str: string) => core(str, REGEXPS)
