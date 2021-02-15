import { secp256k1 } from 'bcrypto'
import { INetwork } from '../models'
import { mainNet } from './../network'
import { IKeyPair } from "../models/identity"
import wif from 'wif'
import { hmacSHA512 } from './../crypto/hash-algo'
import pbkdf2 from 'pbkdf2'
import { fromPublicKey } from './address'

const HASH_KEY = Buffer.from('Bitcoin seed')

export const fromMnemonic = (mnemonic: string, passphrase: string, compressed: boolean = true): IKeyPair => {
  const salt = Buffer.concat([Buffer.from('mnemonic'), Buffer.from(passphrase)])
  const derivedSeed = pbkdf2.pbkdf2Sync(mnemonic, salt, 2048, 64, 'sha512')
  const hashed = hmacSHA512(Buffer.from(HASH_KEY), derivedSeed).slice(0, 32)

  return fromPrivateKey(hashed, compressed)
}

export const fromPrivateKey = (privateKey: Buffer | string, compressed: boolean = true): IKeyPair => {
  privateKey = privateKey instanceof Buffer
    ? privateKey
    : Buffer.from(privateKey, 'hex')

  return {
    publicKey: secp256k1.publicKeyCreate(privateKey, compressed).toString('hex'),
    privateKey: privateKey.toString('hex'),
    compressed
  }
}

export const fromWIF = (wifKey: string, network?: INetwork): IKeyPair => {
  if (!network) {
    network = mainNet
  }

  const { version, compressed, privateKey } = wif.decode(wifKey, network.wif)

  if (version !== network.wif) {
    throw new Error('Wrong network version')
  }

  return {
    publicKey: secp256k1.publicKeyCreate(privateKey, compressed).toString('hex'),
    privateKey: privateKey.toString('hex'),
    compressed
  }
}

export const validatePublicKey = (publicKey: string, networkVersion?: number): boolean => {
  if (!networkVersion) {
    networkVersion = mainNet.pubKeyHash
  }

  try {
    return fromPublicKey(publicKey, networkVersion).length === 34
  } catch (e) {
    return false
  }
}