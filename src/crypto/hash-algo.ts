import { Hash160, Hash256, RIPEMD160, SHA1, SHA256, SHA512 } from 'bcrypto'

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

    for (const element of buffer) {
      sha256 = sha256.update(element)
    }

    return sha256.final()
  }

  return SHA256.digest(bufferize(buffer))
}

export const sha512 = (buffer: Buffer | string | Array<Buffer>): Buffer => {
  if (Array.isArray(buffer)) {
    let sha512 = SHA512.ctx

    sha512.init()

    for (const element of buffer) {
      sha512 = sha512.update(element)
    }

    return sha512.final()
  }

  return SHA256.digest(bufferize(buffer))
}

export const hmacSHA512 = (key: Buffer, seed: Buffer): Buffer => {
  return SHA512.mac(seed, key)
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