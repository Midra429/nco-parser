import { kanji2number } from '@geolonia/japanese-numeral'

export const TEMPLATE_REGEXP_NUM = '\\d+(?:\\.\\d+)?'
export const TEMPLATE_REGEXP_KANSUJI = '[〇一二三四五六七八九十百千万]+'

const REGEXP_NUM = new RegExp(TEMPLATE_REGEXP_NUM)
const REGEXP_KANSUJI = new RegExp(TEMPLATE_REGEXP_KANSUJI)

/**
 * @param str 抽出対象の文字列
 * @param regexp 正規表現 (グループ)
 */
export const core = (str: string, regexps: RegExp[]) => {
  const matches: {
    text: string
    number: number
    prefix: string | null
    suffix: string | null
    range: [start: number, end: number]
  }[] = []

  for (const re of regexps) {
    for (const match of str.matchAll(re)) {
      if (!match.groups || !match.indices) {
        continue
      }

      const { groups, indices } = match

      let num: number | null = null

      if (REGEXP_NUM.test(groups.number)) {
        num = Number(groups.number)
      } else if (REGEXP_KANSUJI.test(groups.number)) {
        num = kanji2number(groups.number)
      }

      if (num !== null) {
        matches.push({
          text: match[0],
          number: num,
          prefix: groups.prefix || null,
          suffix: groups.suffix || null,
          range: [indices[0][0], indices[0][1] - 1],
        })
      }
    }
  }

  matches.sort(({ range: a }, { range: b }) => a[0] - b[0] || a[1] - b[1])

  return matches
}
