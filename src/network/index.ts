import { INetwork } from "../models";

export const mainNet: INetwork = {
  name: 'Strax',
  messagePrefix: 'Strax Message:\n',
  bip32: {
    public: 0x488B21E,
    private: 0x488ADE4,
  },
  pubKeyHash: 0x4B,
  netHash: 0x8C,
  wif: 0xCB,
  slip44: 105105,
  magic: 0x58727453
}