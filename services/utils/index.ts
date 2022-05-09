export const twoDigitsNumber = (digit: number): string =>
  digit < 10 ? `0${digit}` : String(digit)