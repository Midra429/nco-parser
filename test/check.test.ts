import { describe, test, expect } from '@jest/globals'

import { normalizeAll, compare } from '../src'
import { season as extractSeason } from '../src/extract/lib/season'
import { episode as extractEpisode } from '../src/extract/lib/episode'

describe('check', () => {
  test('normalize: おにまい', () => {
    const TITLE_A = 'お兄ちゃんはおしまい！ ＃０１「まひろとイケないカラダ」'
    const TITLE_B = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'

    const normalizedA = normalizeAll(TITLE_A, { space: false })
    const normalizedB = normalizeAll(TITLE_B, { space: false })

    expect(normalizedA === normalizedB).toBe(true)
  })

  test('extract (episode): ダンジョン飯', () => {
    const TITLE_A = 'ダンジョン飯 エピソード19'
    const TITLE_B = 'ダンジョン飯　第１９話　「山姥／夢魔」'

    const normalizedA = normalizeAll(TITLE_A, { space: false })
    const normalizedB = normalizeAll(TITLE_B, { space: false })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (episode): Lv2チート', () => {
    const TITLE_A =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ episode.6「光と闇の魔人ヒヤ」'
    const TITLE_B =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ　episode.6　光と闇の魔人ヒヤ'

    const normalizedA = normalizeAll(TITLE_A, { space: false })
    const normalizedB = normalizeAll(TITLE_B, { space: false })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (season): Lv2チート', () => {
    const TITLE_A = '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」'
    const TITLE_B = '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ'

    const normalizedA = normalizeAll(TITLE_A, { space: false })
    const normalizedB = normalizeAll(TITLE_B, { space: false })

    const { number: seasonNumA } = extractSeason(normalizedA)[0]
    const { number: seasonNumB } = extractSeason(normalizedB)[0]

    expect(seasonNumA === seasonNumB).toBe(true)
  })

  test('compare', () => {
    const TITLES = [
      [
        '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」',
        '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ',
      ],
      [
        '陰の実力者になりたくて！ 2nd season #01「無法都市」',
        '陰の実力者になりたくて！ 2nd season(第2期) #01 無法都市',
      ],
    ]

    expect(TITLES.every(([a, b]) => compare(a, b))).toBe(true)
  })
})
