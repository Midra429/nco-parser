import { describe, test, expect } from '@jest/globals'

import { ncoParser } from '../src'
import { season as extractSeason } from '../src/extract/lib/season'
import { episode as extractEpisode } from '../src/extract/lib/episode'

describe('check', () => {
  test('normalize: おにまい', () => {
    const TITLE_A = 'お兄ちゃんはおしまい！ ＃０１「まひろとイケないカラダ」'
    const TITLE_B = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, { space: false })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, { space: false })

    expect(normalizedA === normalizedB).toBe(true)
  })

  test('extract (episode 1): ダンジョン飯', () => {
    const TITLE_A = 'ダンジョン飯 エピソード19'
    const TITLE_B = 'ダンジョン飯　第１９話　「山姥／夢魔」'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, { space: false })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, { space: false })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (episode 2): Lv2チート', () => {
    const TITLE_A =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ episode.6「光と闇の魔人ヒヤ」'
    const TITLE_B =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ　episode.6　光と闇の魔人ヒヤ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, { space: false })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, { space: false })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (episode 3): Lv2チート', () => {
    const TITLE_A = 'うらら迷路帖 一占 少女と占い、時々おなか'
    const TITLE_B =
      'ご注文はうさぎですか？？ 第1羽 笑顔とフラッシュがやかましい　これが私の自称姉です'
    const TITLE_C =
      '私がモテないのはどう考えてもお前らが悪い！ 喪1 モテないし、ちょっとイメチェンするわ'

    const extractedA = ncoParser.extract(TITLE_A)
    const extractedB = ncoParser.extract(TITLE_B)
    const extractedC = ncoParser.extract(TITLE_C)

    console.log('extractedA', extractedA)
    console.log('extractedB', extractedB)
    console.log('extractedC', extractedC)

    expect(
      extractedA.episode?.number === extractedB.episode?.number &&
        extractedA.episode?.number === extractedC.episode?.number
    ).toBe(true)
  })

  test('extract (season): Lv2チート', () => {
    const TITLE_A = '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」'
    const TITLE_B = '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, { space: false })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, { space: false })

    const extractedA = extractSeason(normalizedA)[0]
    const extractedB = extractSeason(normalizedB)[0]

    expect(extractedA.number === extractedB.number).toBe(true)
  })

  test('extract (season2): ヒロアカ7', () => {
    const TITLE_A = '僕のヒーローアカデミア　第7期 第144話 DIVISION'
    const TITLE_B = '僕のヒーローアカデミア(第7期)'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, { space: false })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, { space: false })

    const extractedA = ncoParser.extract(normalizedA)
    const extractedB = ncoParser.extract(normalizedB)

    console.log('extractedA', extractedA)
    console.log('extractedB', extractedB)

    expect(extractedA.season?.number === extractedB.season?.number).toBe(true)
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

    expect(TITLES.every(([a, b]) => ncoParser.compare(a, b))).toBe(true)
  })
})
