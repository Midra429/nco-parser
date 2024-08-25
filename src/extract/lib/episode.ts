import { NUMBER, KANSUJI, REGEXP_NUMBER, REGEXP_KANSUJI, core } from './core.js'

const notNumber = `[^\\s${NUMBER}${KANSUJI}]`
const notPrefix = 'season|episode|ep|chapter|part'

export const REGEXPS = [
  // 第1話, 2話
  `(?<prefix>第?)(?<number>${REGEXP_NUMBER})(?<suffix>話)`,
  // 第一話, 二話
  `(?<prefix>第?)(?<kansuji>${REGEXP_KANSUJI})(?<suffix>話)`,

  // エピソード1
  `(?<prefix>エピソード)(?<number>${REGEXP_NUMBER})`,

  // episode1, ep 1, episode.1, ep:01, episode|1
  `(?<=[^a-z])(?<prefix>(?:episode|ep)[\\s\\.:|]?)(?<number>${REGEXP_NUMBER})(?=\\s|$)`,

  // chapter1, chapter.1, chapter:1, chapter|1
  `(?<=[^a-z])(?<prefix>(?:chapter)[\\s\\.:|]?)(?<number>${REGEXP_NUMBER})(?=\\s|$)`,

  // #01
  `(?<prefix>#)(?<number>${REGEXP_NUMBER})`,
].map((v) => new RegExp(v, 'dgi'))

export const REGEXPS_VAGUE = [
  // <タイトル> (一占 | 第一羽 | 第1憑目 | 喪1) <サブタイトル>
  ...[
    `(?<prefix>${notNumber}{1,3})(?<number>${REGEXP_NUMBER})(?<suffix>${notNumber}{0,3})`,
    `(?<prefix>${notNumber}{1,3})(?<kansuji>${REGEXP_KANSUJI})(?<suffix>${notNumber}{0,3})`,
    `(?<prefix>${notNumber}{0,3})(?<number>${REGEXP_NUMBER})(?<suffix>${notNumber}{1,3})`,
    `(?<prefix>${notNumber}{0,3})(?<kansuji>${REGEXP_KANSUJI})(?<suffix>${notNumber}{1,3})`,
  ].map((v) => `(?<=\\S+\\s)(?<!(?:${notPrefix}))${v}(?=\\s\\S+)`),

  // <タイトル> Log 01 <サブタイトル>
  `(?<=\\S+\\s)(?<!(?:${notPrefix}))(?<prefix>[a-z]{2,6}\\s)(?<number>${REGEXP_NUMBER})(?=\\s\\S+)`,

  // <タイトル> 01 <サブタイトル>
  `(?<=\\S+)(?<!(?:${notPrefix}))(?:\\s)(?<number>0?[0-9]{2}|[1-9][0-9]{2})(?=\\s\\S+)`,
].map((v) => new RegExp(v, 'dgi'))

export const episode = (str: string, strict?: boolean) => {
  const results = core(str, REGEXPS)

  if (!strict) {
    results.push(...core(str, REGEXPS_VAGUE))
  }

  results.sort(({ range: a }, { range: b }) => a[0] - b[0] || a[1] - b[1])

  return results
}
