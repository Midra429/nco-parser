import * as adjust from './lib/adjust'
import * as remove from './lib/remove'

export const normalize = (
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
  str = adjust.charWidth(str)

  // 空白
  str = adjust.space(str)

  // 記号
  str = adjust.symbol(str)

  // ローマ数字
  str = adjust.romanNum(str)

  // 小文字
  str = str.toLowerCase()

  /******************************
   * 除去
   ******************************/

  // 括弧
  if (option.bracket || (option.bracket !== false && option.all)) {
    str = remove.bracket(str)
  }

  // 記号
  if (option.symbol || (option.symbol !== false && option.all)) {
    str = remove.symbol(str)
  }

  // アニメ
  str = remove.anime(str)

  // 映画
  str = remove.movie(str)

  // コメント専用動画
  str = remove.szbh(str)

  // 動画配信サービス
  str = remove.vod(str)

  // スペース
  if (option.space || (option.space !== false && option.all)) {
    str = remove.space(str)
  }
  // 連続したスペースを1文字に
  else {
    str = str.replace(/\s+/g, ' ')
  }

  return str.trim()
}

export const normalizeAll = (...args: Parameters<typeof normalize>) => {
  return normalize(args[0], { ...(args[1] ?? {}), all: true })
}
