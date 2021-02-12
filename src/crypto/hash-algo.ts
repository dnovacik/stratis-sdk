import { Hash160, Hash256, RIPEMD160, SHA1, SHA256 } from 'bcrypto'

export const ripemd160 = (buffer: Buffer | string): Buffer => {
  return RIPEMD160.digest(bufferize(buffer))
}

export const sha1 = (buffer: Buffer | string): Buffer => {
  return SHA1.digest(bufferize(buffer))
}

export const sha256 = (buffer: Buffer | string | Array<Buffer>): Buffer => {
  if (Array.isArray(buffer)) {
    let sha256 = SHA256.ctx

    sha256.init()

    buffer.forEach((e: Buffer) => {
      sha256 = sha256.update(e)
    })

    return sha256.final()
  }

  return SHA256.digest(bufferize(buffer))
}

export const hash160 = (buffer: Buffer | string): Buffer => {
  return Hash160.digest(bufferize(buffer))
}

export const hash256 = (buffer: Buffer | string): Buffer => {
  return Hash256.digest(bufferize(buffer))
}

const bufferize = (buffer: Buffer | string): Buffer => {
  return buffer instanceof Buffer
    ? buffer
    : Buffer.from(buffer)
}