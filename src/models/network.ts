export interface INetwork {
  name: string
  messagePrefix: string
  bip32: {
    public: number
    private: number
  }
  pubKeyHash: number
  netHash: number
  wif: number
  slip44: number
  magic: number
}