import { NUMBER, KANSUJI, REGEXP_NUMBER, REGEXP_KANSUJI, core } from './core.js'

const notNumber = `[^\\s${NUMBER}${KANSUJI}]`

export const REGEXPS = [
  // 第1話, 2話
  `(?<prefix>第?)(?<number>${REGEXP_NUMBER})(?<suffix>話)`,
  // 第一話, 二話
  `(?<prefix>第?)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>話)`,

  // エピソード1
  `(?<prefix>エピソード)(?<number>${REGEXP_NUMBER})`,

  // episode1, ep 1, episode.1, ep:01, episode|1
  `(?<=[^a-z])(?<prefix>(?:episode|ep)[\\s\\.:|]?)(?<number>${REGEXP_NUMBER})`,

  // chapter1, chapter.1, chapter:1, chapter|1
  `(?<=[^a-z])(?<prefix>(?:chapter)[\\s\\.:|]?)(?<number>${REGEXP_NUMBER})`,

  // #01
  `(?<prefix>#)(?<number>${REGEXP_NUMBER})`,

  // <タイトル> 01 <サブタイトル>
  /(?<!(?:season|episode|ep|chapter)\s)(?<=\s)(?<number>0?[0-9]{2}|[1-9][0-9]{2})(?=\s\S+)/,
].map((v) => new RegExp(v, 'dgi'))

export const REGEXPS_VAGUE = [
  // <タイトル> (一占 | 第一羽 | 第1憑目 | 喪1) <サブタイトル>
  ...[
    `(?<prefix>${notNumber}+)(?<number>${REGEXP_NUMBER})(?<suffix>${notNumber}*)`,
    `(?<prefix>${notNumber}+)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>${notNumber}*)`,
    `(?<prefix>${notNumber}*)(?<number>${REGEXP_NUMBER})(?<suffix>${notNumber}+)`,
    `(?<prefix>${notNumber}*)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>${notNumber}+)`,
  ].map((v) => `(?<=\\S+\\s)${v}(?=\\s\\S+)`),

  // <タイトル> Log 01 <サブタイトル>
  // `(?<=\\S+)(?<prefix>[a-z]+\\s?)(?<number>${REGEXP_NUMBER})(?=(?:\\s\\S+)$)`,
].map((v) => new RegExp(v, 'dgi'))

export const episode = (str: string, strict?: boolean) => {
  const results = core(str, REGEXPS)

  if (!strict) {
    results.push(...core(str, REGEXPS_VAGUE))
  }

  results.sort(({ range: a }, { range: b }) => a[0] - b[0] || a[1] - b[1])

  return results
}
