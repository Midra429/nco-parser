import * as adjust from './lib/adjust'
import * as remove from './lib/remove'

type NromalizeOptions = {
  /**
   * @default true
   */
  adjust?: {
    /** 全角半角 */
    charWidth?: boolean
    /** 空白 */
    space?: boolean
    /** 記号 */
    symbol?: boolean
    /** ローマ数字 */
    romanNum?: boolean
    /** 大文字・小文字 */
    letterCase?: 'upper' | 'lower'
  }

  /**
   * @default false
   */
  remove?: {
    /** オプション全て */
    all?: boolean

    /** 括弧 */
    bracket?: boolean
    /** 記号 */
    symbol?: boolean
    /** スペース */
    space?: boolean
  }
}

export const normalize = (
  str: string,
  options: NromalizeOptions = {}
): string => {
  str = str.trim()

  /******************************
   * 正規化
   ******************************/

  // 全角半角
  if (options.adjust?.charWidth !== false) {
    str = adjust.charWidth(str)
  }

  // 空白
  if (options.adjust?.space !== false) {
    str = adjust.space(str)
  }

  // 記号
  if (options.adjust?.symbol !== false) {
    str = adjust.symbol(str)
  }

  // ローマ数字
  if (options.adjust?.romanNum !== false) {
    str = adjust.romanNum(str)
  }

  // 大文字
  if (options.adjust?.letterCase === 'upper') {
    str = str.toUpperCase()
  }
  // 小文字
  else {
    str = str.toLowerCase()
  }

  /******************************
   * 除去
   ******************************/

  // 括弧
  if (
    options.remove?.bracket ||
    (options.remove?.bracket !== false && options.remove?.all)
  ) {
    str = remove.bracket(str)
  }

  // 記号
  if (
    options.remove?.symbol ||
    (options.remove?.symbol !== false && options.remove?.all)
  ) {
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
  if (
    options.remove?.space ||
    (options.remove?.space !== false && options.remove?.all)
  ) {
    str = remove.space(str)
  }
  // 連続したスペースを1文字に
  else {
    str = str.replace(/\s+/g, ' ')
  }

  return str.trim()
}

export const normalizeAll = (...args: Parameters<typeof normalize>) => {
  return normalize(args[0], {
    ...(args[1] ?? {}),
    remove: { all: true },
  })
}
