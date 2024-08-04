import { number2kanji, kanji2number } from '@geolonia/japanese-numeral'

export const NUMBER = /\d/
export const KANSUJI = /〇一二三四五六七八九十百千万/
export const REGEXP_NUMBER = new RegExp(
  `${NUMBER.source}+(?:\\.${NUMBER.source}+)?`
)
export const REGEXP_KANSUJI = new RegExp(`[${KANSUJI.source}]+`)

/**
 * @param str 抽出対象の文字列
 * @param regexp 正規表現 (グループ)
 */
export const core = (str: string, regexps: RegExp[]) => {
  const matches: {
    text: string
    number: number
    kansuji: string
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

      let number: number | null = null
      let kansuji: string | null = null

      if (REGEXP_NUMBER.test(groups.number)) {
        number = Number(groups.number)
        kansuji = number2kanji(number)
      } else if (REGEXP_KANSUJI.test(groups.number)) {
        kansuji = groups.number
        number = kanji2number(kansuji)
      }

      if (number !== null && kansuji !== null) {
        matches.push({
          text: match[0],
          number,
          kansuji,
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
