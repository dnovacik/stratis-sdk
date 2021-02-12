import { mainNet } from './../network'
import { ripemd160 } from './../crypto/hash-algo'
import { base58 } from './../crypto/base58'
import * as PublicKey from './pubkey'
import { INetwork } from '../models'

export const fromPassphrase = (passphrase: string, networkVersion?: number): string => {
  return ''
}

export const fromPublicKey = (publicKey: string, networkVersion?: number): string => {
  if (!/^[0-9A-Fa-f]{66}$/.test(publicKey)) {
    throw new Error(`Incorrect public key format: ${publicKey}`);
  }

  const buffer = ripemd160(Buffer.from(publicKey, 'hex'))
  const payload = setNetworkByte(buffer, networkVersion)

  return fromBuffer(payload)
}

export const fromWIF = (wif: string, network?: INetwork): string => {
  return fromPublicKey(PublicKey.fromWiF(wif, network))
}

export const fromPrivateKey = (privateKey: string, networkVersion?: number): string => {
  return ''
}

export const fromBuffer = (buffer: Buffer): string => {
  return base58.encodeCheck(buffer)
}

export const toBuffer = (address: string): { addressBuffer: Buffer, error?: string } => {
  const buffer = base58.decodeCheck(address)
  const expectedNetworkVersion = mainNet.pubKeyHash
  const networkVersion = buffer[0]

  const result: { addressBuffer: Buffer, error?: string } = {
    addressBuffer: buffer
  }

  if (networkVersion !== expectedNetworkVersion) {
    result.error = `Expected address network byte ${expectedNetworkVersion}, but got ${networkVersion}`
  }

  return result
}

export const validate = (address: string, networkVersion?: number): boolean => {
  if (!networkVersion) {
    networkVersion = mainNet.pubKeyHash
  }

  try {
    return base58.decodeCheck(address)[0] === networkVersion
  } catch (err) {
    return false
  }
}

const setNetworkByte = (buffer: Buffer, networkVersion?: number): Buffer => {
  if (!networkVersion) {
    networkVersion = mainNet.pubKeyHash
  }

  const result = Buffer.alloc(21)
  result.writeUInt8(networkVersion, 0)
  buffer.copy(result, 1)

  return result
}