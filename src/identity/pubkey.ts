import { INetwork } from '../models'
import { fromWIF as keysFromWIF, fromPassphrase as keysFromPassphrase } from './keys'
import { mainNet } from './../network'
import { fromPublicKey } from './address'

export const fromPassphrase = (passphrase: string): string => {
  return keysFromPassphrase(passphrase).publicKey
}

export const fromWiF = (wif: string, network?: INetwork): string => {
  return keysFromWIF(wif, network).publicKey
}

export const validate = (publicKey: string, networkVersion?: number): boolean => {
  if (!networkVersion) {
    networkVersion = mainNet.pubKeyHash
  }

  try {
    return fromPublicKey(publicKey, networkVersion).length === 34
  } catch (e) {
    return false
  }
}