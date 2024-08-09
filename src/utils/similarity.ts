export const levenshtein = (strA: string, strB: string): number => {
  const matrix: number[][] = []

  for (let i = 0; i <= strB.length; i++) {
    matrix[i] = [i]
  }

  for (let i = 0; i <= strA.length; i++) {
    matrix[0][i] = i
  }

  for (let i = 1; i <= strB.length; i++) {
    for (let j = 1; j <= strA.length; j++) {
      if (strB.charAt(i - 1) === strA.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[strB.length][strA.length]
}

export const similarity = (strA: string, strB: string): number => {
  const maxLength = Math.max(strA.length, strB.length)

  if (maxLength) {
    const distance = levenshtein(strA, strB)

    return (maxLength - distance) / maxLength
  }

  return 1
}
