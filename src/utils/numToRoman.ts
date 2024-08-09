const DECIMAL_ROMAN_PAIRS = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
] as const

/**
 * 数字 → ローマ数字
 * @param num `1 <= num <= 3999`
 * @param lower 小文字
 * @example
 * 1 → 'I'
 * 4 → 'IV'
 */
export const numToRoman = (num: number, lower?: boolean): string => {
  let result = ''

  if (1 <= num && num <= 3999) {
    for (const [decimal, roman] of DECIMAL_ROMAN_PAIRS) {
      while (decimal <= num) {
        result += roman
        num -= decimal
      }
    }
  }

  if (!result) {
    return num.toString()
  }

  if (lower) {
    return result.toLowerCase()
  }

  return result
}
