import { secp256k1 } from 'bcrypto'
import { IKeyPair } from '../models'

export const signECDSA = (hash: Buffer, keys: IKeyPair): string => {
  return secp256k1.signatureExport(secp256k1.sign(hash, bufferize(keys.privateKey))).toString('hex')
}

export const verifyECDSA = (hash: Buffer, signature: Buffer | string, publicKey: Buffer | string): boolean => {
  signature = bufferize(signature)
  const signatureRS = secp256k1.signatureImport(signature)

  if (!secp256k1.isLowS(signatureRS)) {
    return false
  }

  const signatureLength = signature.readUInt8(1)
  const rLength = signature.readUInt8(3)
  const sLength = signature.readUInt8(4 + rLength + 1)

  if (signature.length !== 4 + rLength + sLength || signatureLength !== 2 + rLength + sLength || signatureLength > 127) {
    return false
  }

  const firstByteR = signature.readInt8(4)
  const firstByteS = signature.readInt8(4 + rLength + 2)

  if (firstByteR < 0 || firstByteS < 0 || firstByteR > 127 || firstByteS > 127) {
    return false
  }

  if (firstByteR === 0 && signature.readInt8(5) >= 0 || firstByteS === 0 && signature.readInt8(4 + rLength + 3) >= 0) {
    return false
  }

  return secp256k1.verify(hash, signatureRS, bufferize(publicKey))
}

export const signSchnorr = (hash: Buffer, keys: IKeyPair): string => {
  return secp256k1.schnorrSign(hash, bufferize(keys.privateKey)).toString('hex')
}

export const verifySchnorr = (hash: Buffer, signature: Buffer | string, publicKey: Buffer | string): boolean => {
  return secp256k1.schnorrVerify(hash, bufferize(signature), bufferize(publicKey))
}

const bufferize = (obj: Buffer | string): Buffer => {
  return obj instanceof Buffer
    ? obj
    : Buffer.from(obj, 'hex')
}