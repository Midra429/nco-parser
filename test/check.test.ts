import { describe, test, expect } from '@jest/globals'
import compare from 'just-compare'

import { extractor, normalizerAll } from '../src'
import { season as extractSeason } from '../src/extractor/lib/season'
import { episode as extractEpisode } from '../src/extractor/lib/episode'

describe('check', () => {
  test('normalize: おにまい', () => {
    const TITLE_A = 'お兄ちゃんはおしまい！ ＃０１「まひろとイケないカラダ」'
    const TITLE_B = 'お兄ちゃんはおしまい！ #01 まひろとイケないカラダ'

    const normalizedA = normalizerAll(TITLE_A, { space: false })
    const normalizedB = normalizerAll(TITLE_B, { space: false })

    expect(compare(normalizedA, normalizedB)).toBe(true)
  })

  test('extractor (season): 魔法科高校3', () => {
    const TITLE_A = '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」'
    const TITLE_B = '魔法科高校の劣等生 3期 01 ダブル・セブン編Ⅰ'

    const normalizedA = normalizerAll(TITLE_A, { space: false })
    const normalizedB = normalizerAll(TITLE_B, { space: false })

    const extractedSeasonA = extractSeason(normalizedA)
    const extractedSeasonB = extractSeason(normalizedB)

    expect(
      compare(
        extractedSeasonA.every((v, i, a) => v.number === a.at(i - 1)!.number),
        extractedSeasonB.every((v, i, a) => v.number === a.at(i - 1)!.number)
      )
    ).toBe(true)
  })

  test('extractor (episode): ダンジョン飯', () => {
    const TITLE_A = 'ダンジョン飯 エピソード19'
    const TITLE_B = 'ダンジョン飯　第１９話　「山姥／夢魔」'

    const normalizedA = normalizerAll(TITLE_A, { space: false })
    const normalizedB = normalizerAll(TITLE_B, { space: false })

    const extractedEpisodeA = extractEpisode(normalizedA)
    const extractedEpisodeB = extractEpisode(normalizedB)

    expect(
      compare(
        extractedEpisodeA.every((v, i, a) => v.number === a.at(i - 1)!.number),
        extractedEpisodeB.every((v, i, a) => v.number === a.at(i - 1)!.number)
      )
    ).toBe(true)
  })

  test('extractor (episode): Lv2チート', () => {
    const TITLE_A =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ episode.6「光と闇の魔人ヒヤ」'
    const TITLE_B =
      'Lv2からチートだった元勇者候補のまったり異世界ライフ　episode.6　光と闇の魔人ヒヤ'

    const normalizedA = normalizerAll(TITLE_A, { space: false })
    const normalizedB = normalizerAll(TITLE_B, { space: false })

    const extractedEpisodeA = extractEpisode(normalizedA)
    const extractedEpisodeB = extractEpisode(normalizedB)

    expect(compare(extractedEpisodeA, extractedEpisodeB)).toBe(true)
  })

  test('extractor', (done) => {
    const TITLE =
      '妖怪ウォッチ　第12話　「妖怪おならず者」 「じんめん犬シーズン２ 犬脱走 Episode1」 「コマさん～はじめてのケータイ編～」'
    // const TITLE = '魔法科高校の劣等生 第3シーズン 01「ダブル・セブン編Ⅰ」'
    // const TITLE_A = '陰の実力者になりたくて！ 2nd season #01「無法都市」'
    // const TITLE_B = '陰の実力者になりたくて！ 2nd season(第2期) #01 無法都市'

    const extracted = extractor(TITLE)
    const { normalized, season, episode, workTitle, subTitle } = extracted

    console.log(extracted)

    const fragments: string[] = []

    if (episode && workTitle && subTitle) {
      fragments.push(workTitle)

      if (season) {
        fragments.push(`${season.number}期`)
      }

      fragments.push(`${episode.number}話`)
      fragments.push(subTitle)
    }

    const title = fragments.join(' ')

    console.log('extractor: title:', title)

    done()
  })
})
