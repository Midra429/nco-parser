import {
  NUMBER,
  KANSUJI,
  TEMPLATE_REGEXP_NUM,
  TEMPLATE_REGEXP_KANSUJI,
  core,
} from './_core'

const NUM_KANSUJI = `${TEMPLATE_REGEXP_NUM}|${TEMPLATE_REGEXP_KANSUJI}`

export const REGEXPS_PRECISE = [
  // 第1話, 一話
  `(?<prefix>第?)(?<number>${NUM_KANSUJI})(?<suffix>話)`,

  // エピソード1
  `(?<prefix>エピソード)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // episode1, ep 1, episode.1, ep:01, episode|1
  `(?<=[^a-z])(?<prefix>(?:episode|ep)[\\s\\.:|]?)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // chapter1
  `(?<=[^a-z])(?<prefix>(?:chapter)[\\s\\.]?)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // #01
  `(?<prefix>#)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // <タイトル> 01 <サブタイトル>
  /(?<!(?:season|episode|ep)\s)(?<=\s)(?<number>0?[0-9]{2}|[1-9][0-9]{2})(?=(?:\s\S+)?$)/,
].map((v) => new RegExp(v, 'dgi'))

export const REGEXPS_AMBIGUOUS = [
  // <タイトル> (一占 | 第一羽 | 第1憑目 | 喪1) <サブタイトル>
  `(?<=^(?:.+\\s))(?<prefix>[^${NUMBER}${KANSUJI}\\s]+)(?<number>${NUM_KANSUJI})(?<suffix>[^${NUMBER}${KANSUJI}\\s]*)(?=(?:\\s.+)$)`,
  `(?<=^(?:.+\\s))(?<prefix>[^${NUMBER}${KANSUJI}\\s]*)(?<number>${NUM_KANSUJI})(?<suffix>[^${NUMBER}${KANSUJI}\\s]+)(?=(?:\\s.+)$)`,
].map((v) => new RegExp(v, 'dgi'))

export const episode = (str: string, weak: boolean = true) => {
  const results = core(str, REGEXPS_PRECISE)

  if (weak) {
    results.push(...core(str, REGEXPS_AMBIGUOUS))
  }

  results.sort(({ range: a }, { range: b }) => a[0] - b[0] || a[1] - b[1])

  return results
}
