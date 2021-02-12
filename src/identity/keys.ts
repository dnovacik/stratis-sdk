import { secp256k1 } from 'bcrypto'
import { INetwork } from '../models'
import { mainNet } from './../network'
import { IKeyPair } from "../models/identity"
import wif from 'wif'
import { sha256 } from './../crypto/hash-algo'

export const fromPassphrase = (passphrase: string, compressed: boolean = true): IKeyPair => {
  return fromPrivateKey(sha256(Buffer.from(passphrase, 'utf8')), compressed)
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