export const anime = (str: string): string => {
  // シュタインズ・ゲート -> STEINS;GATE
  str = str.replace(/シュタインズ[・\s]?ゲート(?!\s?ゼロ)/, 'STEINS;GATE')

  return str
}
