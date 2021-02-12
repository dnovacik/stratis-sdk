import Base58 from 'bcrypto/lib/js/base58'
import memoize from 'fast-memoize'
import { hash256 } from './../crypto/hash-algo'

const encodeCheck = (buffer: Buffer): string => {
  const checksum = hash256(buffer)

  return Base58.encode(Buffer.concat([buffer, checksum], buffer.length + 4))
}

const decodeCheck = (address: string): Buffer => {
  const buffer = Base58.decode(address)
  const payload = buffer.slice(0, -4)
  const checksum = hash256(payload)

  if (checksum.readUInt32LE(0) !== buffer.slice(-4).readUInt32LE(0)) {
    throw new Error(`Invalid checksum for address ${address}`)
  }

  return payload
}

export const base58 = {
  encodeCheck: memoize(encodeCheck),
  decodeCheck: memoize(decodeCheck)
}