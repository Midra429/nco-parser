import { REGEXP_NUMBER, REGEXP_KANSUJI, core } from './core.js'

export const REGEXPS = [
  // 第2期, 3期
  `(?<prefix>第?)(?<number>${REGEXP_NUMBER})(?<suffix>期)`,
  // 第二期, 三期
  `(?<prefix>第?)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>期)`,

  // 第2シリーズ, 第3シーズン
  `(?<prefix>第)(?<number>${REGEXP_NUMBER})(?<suffix>シリーズ|シーズン)`,
  // 第二シリーズ, 第三シーズン
  `(?<prefix>第)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>シリーズ|シーズン)`,

  // シーズン2
  `(?<prefix>シーズン)(?<number>${REGEXP_NUMBER})`,

  // season 2
  `(?<prefix>season\\s?)(?<number>${REGEXP_NUMBER})`,

  // 2nd season
  `(?<number>${REGEXP_NUMBER})(?<suffix>(?:st|nd|rd|th)\\sseason)`,
].map((v) => new RegExp(v, 'dgi'))

export const season = (str: string) => core(str, REGEXPS)
