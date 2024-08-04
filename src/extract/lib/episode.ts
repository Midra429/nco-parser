import {
  NUMBER,
  KANSUJI,
  REGEXP_NUMBER,
  REGEXP_KANSUJI,
  core,
} from './_core.js'

const REGEXP_NUM_KANSUJI = `${REGEXP_NUMBER.source}|${REGEXP_KANSUJI.source}`

export const REGEXPS_PRECISE = [
  // 第1話, 一話
  `(?<prefix>第?)(?<number>${REGEXP_NUM_KANSUJI})(?<suffix>話)`,

  // エピソード1
  `(?<prefix>エピソード)(?<number>${REGEXP_NUMBER.source})`,

  // episode1, ep 1, episode.1, ep:01, episode|1
  `(?<=[^a-z])(?<prefix>(?:episode|ep)[\\s\\.:|]?)(?<number>${REGEXP_NUMBER.source})`,

  // chapter1
  `(?<=[^a-z])(?<prefix>(?:chapter)[\\s\\.]?)(?<number>${REGEXP_NUMBER.source})`,

  // #01
  `(?<prefix>#)(?<number>${REGEXP_NUMBER.source})`,

  // <タイトル> 01 <サブタイトル>
  /(?<!(?:season|episode|ep)\s)(?<=\s)(?<number>0?[0-9]{2}|[1-9][0-9]{2})(?=(?:\s\S+)?$)/,
].map((v) => new RegExp(v, 'dgi'))

export const REGEXPS_AMBIGUOUS = [
  // <タイトル> (一占 | 第一羽 | 第1憑目 | 喪1) <サブタイトル>
  `(?<=^(?:.+\\s))(?<prefix>[^${NUMBER.source}${KANSUJI.source}\\s]+)(?<number>${REGEXP_NUM_KANSUJI})(?<suffix>[^${NUMBER.source}${KANSUJI.source}\\s]*)(?=(?:\\s.+)$)`,
  `(?<=^(?:.+\\s))(?<prefix>[^${NUMBER.source}${KANSUJI.source}\\s]*)(?<number>${REGEXP_NUM_KANSUJI})(?<suffix>[^${NUMBER.source}${KANSUJI.source}\\s]+)(?=(?:\\s.+)$)`,
].map((v) => new RegExp(v, 'dgi'))

export const episode = (str: string, weak: boolean = true) => {
  const results = core(str, REGEXPS_PRECISE)

  if (weak) {
    results.push(...core(str, REGEXPS_AMBIGUOUS))
  }

  results.sort(({ range: a }, { range: b }) => a[0] - b[0] || a[1] - b[1])

  return results
}
