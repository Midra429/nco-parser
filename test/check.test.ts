import { describe, test, expect } from '@jest/globals'

import { ncoParser } from '../dist/index.js'
import { season as extractSeason } from '../dist/extract/lib/season.js'
import { episode as extractEpisode } from '../dist/extract/lib/episode.js'

describe('check', () => {
  test('normalize: おにまい', () => {
    const TITLE_A = 'お兄ちゃんはおしまい！ ＃０１「まひろとイケないカラダ」'
    const TITLE_B = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, {
      remove: {
        space: false,
      },
    })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, {
      remove: {
        space: false,
      },
    })

    expect(normalizedA === normalizedB).toBe(true)
  })

  test('extract (episode): ダンジョン飯', () => {
    const TITLE_A = 'ダンジョン飯 エピソード19'
    const TITLE_B = 'ダンジョン飯　第１９話　「山姥／夢魔」'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, {
      remove: {
        space: false,
      },
    })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, {
      remove: {
        space: false,
      },
    })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (episode): Lv2チート', () => {
    const TITLE_A =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ episode.6「光と闇の魔人ヒヤ」'
    const TITLE_B =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ　episode.6　光と闇の魔人ヒヤ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, {
      remove: {
        space: false,
      },
    })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, {
      remove: {
        space: false,
      },
    })

    const { number: epNumA } = extractEpisode(normalizedA)[0]
    const { number: epNumB } = extractEpisode(normalizedB)[0]

    expect(epNumA === epNumB).toBe(true)
  })

  test('extract (episode): 特殊な話数表記', () => {
    const TITLE_A = 'うらら迷路帖 一占 少女と占い、時々おなか'
    const TITLE_B =
      'ご注文はうさぎですか？？ 第1羽 笑顔とフラッシュがやかましい　これが私の自称姉です'
    const TITLE_C =
      '私がモテないのはどう考えてもお前らが悪い！ 喪1 モテないし、ちょっとイメチェンするわ'
    const TITLE_D =
      'ツンデレ悪役令嬢リーゼロッテと実況の遠藤くんと解説の小林さん chapter 1 ツンデレと王子と天の声'

    const extractedA = ncoParser.extract(TITLE_A)
    const extractedB = ncoParser.extract(TITLE_B)
    const extractedC = ncoParser.extract(TITLE_C)
    const extractedD = ncoParser.extract(TITLE_D)

    expect(
      extractedA.episode?.number === extractedB.episode?.number &&
        extractedA.episode?.number === extractedC.episode?.number &&
        extractedA.episode?.number === extractedD.episode?.number
    ).toBe(true)
  })

  test('extract (episode): ATRI', () => {
    const TITLE = 'ATRI -My Dear Moments- Log 03 「ヒットマン・ザコ・スクール」'

    const extracted = ncoParser.extract(TITLE)

    expect(extracted.episode?.number === 3).toBe(true)
  })

  test('extract (season): 魔法科高校の劣等生', () => {
    const TITLE_A = '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」'
    const TITLE_B = '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, {
      remove: {
        space: false,
      },
    })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, {
      remove: {
        space: false,
      },
    })

    const extractedA = extractSeason(normalizedA)[0]
    const extractedB = extractSeason(normalizedB)[0]

    expect(extractedA.number === extractedB.number).toBe(true)
  })

  test('extract (season2): ヒロアカ7', () => {
    const TITLE_A = '僕のヒーローアカデミア　第7期 第144話 DIVISION'
    const TITLE_B = '僕のヒーローアカデミア(第7期)'

    const normalizedA = ncoParser.normalizeAll(TITLE_A, {
      remove: {
        space: false,
      },
    })
    const normalizedB = ncoParser.normalizeAll(TITLE_B, {
      remove: {
        space: false,
      },
    })

    const extractedA = ncoParser.extract(normalizedA)
    const extractedB = ncoParser.extract(normalizedB)

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
      [
        '無職転生 ～異世界行ったら本気だす～ 2期 第0話 守護術師フィッツ',
        '無職転生Ⅱ ～異世界行ったら本気だす～ #0 守護術師フィッツ',
      ],
      [
        '新米オッサン冒険者、最強パーティに死ぬほど鍛えられて無敵になる。',
        '新米オッサン冒険者、最強パーティに死ぬほど鍛えられて無敵になる。',
      ],
    ]

    expect(TITLES.every(([a, b]) => ncoParser.compare(a, b))).toBe(true)
  })
})
