import { TEMPLATE_REGEXP_NUM, TEMPLATE_REGEXP_KANSUJI, core } from './_core'

export const REGEXPS = [
  // 第2期, ニ期
  `(?<prefix>第?)(?<number>${TEMPLATE_REGEXP_NUM}|${TEMPLATE_REGEXP_KANSUJI})(?<suffix>期)`,

  // 第2シリーズ, 第2シーズン
  `(?<prefix>第)(?<number>${TEMPLATE_REGEXP_NUM}|${TEMPLATE_REGEXP_KANSUJI})(?<suffix>シリーズ|シーズン)`,

  // シーズン2
  `(?<prefix>シーズン)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // season 2
  `(?<prefix>season\\s?)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // 2nd season
  `(?<number>${TEMPLATE_REGEXP_NUM})(?<suffix>(?:st|nd|rd|th)\\sseason)`,
].map((v) => new RegExp(v, 'dgi'))

export const season = (str: string) => core(str, REGEXPS)
