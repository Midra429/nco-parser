import { TEMPLATE_REGEXP_NUM, TEMPLATE_REGEXP_KANSUJI, core } from './_core'

export const REGEXPS = [
  // 第1話, 一話
  `(?<prefix>第?)(?<number>${TEMPLATE_REGEXP_NUM}|${TEMPLATE_REGEXP_KANSUJI})(?<suffix>話)`,

  // エピソード1
  `(?<prefix>エピソード)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // episode1, ep 1, episode.1, ep:01, episode|1
  `(?<=[^a-z])(?<prefix>(?:episode|ep)[\\s\\.:|]?)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // #01
  `(?<prefix>#)(?<number>${TEMPLATE_REGEXP_NUM})`,

  // <タイトル> 01 <サブタイトル>
  /(?<!(?:season|episode|ep)\s)(?<=\s)(?<number>0?[0-9]{2}|[1-9][0-9]{2})(?=(?:\s\S+)?$)/,
].map((v) => new RegExp(v, 'dgi'))

export const episode = (str: string) => core(str, REGEXPS)
