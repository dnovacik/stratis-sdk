import bs58check from 'bs58check'
import memoize from 'fast-memoize'

const encodeCheck = (buffer: Buffer): string => {
  return bs58check.encode(buffer)
}

const decodeCheck = (address: string): Buffer => {
  return bs58check.decode(address)
}

export const base58 = {
  encodeCheck: memoize(encodeCheck),
  decodeCheck: memoize(decodeCheck)
}