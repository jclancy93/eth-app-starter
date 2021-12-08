export function isZero(hexNumberString: string): boolean {
    return /^0x0*$/.test(hexNumberString)
  }