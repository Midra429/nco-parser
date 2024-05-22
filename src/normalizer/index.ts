import * as normalize from './lib/normalize'
import * as removal from './lib/removal'

export const normalizer = (
  str: string,
  option: {
    /** オプション全て */
    all?: boolean
    /** 括弧除去 */
    bracket?: boolean
    /** 記号除去 */
    symbol?: boolean
    /** スペース除去 */
    space?: boolean
  } = {}
): string => {
  str = str.trim()

  /******************************
   * 正規化
   ******************************/

  // 全角半角
  str = normalize.charWidth(str)

  // 空白
  str = normalize.space(str)

  // 記号
  str = normalize.symbol(str)

  // ローマ数字
  str = normalize.romanNum(str)

  // 小文字
  str = str.toLowerCase()

  /******************************
   * 除去
   ******************************/

  // 括弧
  if (option.bracket || (option.bracket !== false && option.all)) {
    str = removal.bracket(str)
  }

  // 記号
  if (option.symbol || (option.symbol !== false && option.all)) {
    str = removal.symbol(str)
  }

  // アニメ
  str = removal.anime(str)

  // 映画
  str = removal.movie(str)

  // コメント専用動画
  str = removal.szbh(str)

  // 動画配信サービス
  str = removal.vod(str)

  // スペース
  if (option.space || (option.space !== false && option.all)) {
    str = removal.space(str)
  }
  // 連続したスペースを1文字に
  else {
    str = str.replace(/\s+/g, ' ')
  }

  return str.trim()
}

export const normalizerAll = (...args: Parameters<typeof normalizer>) => {
  return normalizer(args[0], { ...(args[1] ?? {}), all: true })
}
