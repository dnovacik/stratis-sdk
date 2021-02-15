import { fromMnemonic, fromPrivateKey, fromWIF } from './../../src/identity/keys'

// const address = 'XUcQZ8tVKVyAvUYDLv5i5qKZtobHKWUwfN'
const publicKey = '03938a8568863beb36750be574cd505193dff76cd3801c9cf22299906f8c03ebe9'
const privateKey = 'd0081ffe5ad3b7d5cf8ed9406dee5742543c8804f531f18d9d58c14cc34cf37a'
const wif = 'X9gPUznqiNTQB5DvcVnm9KSye5R7JfRCYhgNCV4Y38LJUtZVaAHt'

const mnemonicPublicKey = '03b5f023e7dcc4e1160fc5bb58ee34459d14e7b3eb756260da8ec0234ab6850b18'
const mnemonicPrivateKey = '1168f71c0cc48086562d48eb105e85ae6118cb7a34955d4d6af0307774e49a75'
const mnemonic = 'render have ladder property wave afford bag morning question senior pioneer december'
const passphrase = 'kekec'

describe('Identity.Keys tests', () => {
  it('should get correct public key from private key', () => {
    const keyPair = fromPrivateKey(privateKey)

    expect(keyPair.privateKey).toBe(privateKey)
    expect(keyPair.publicKey).toBe(publicKey)
  })

  it('should get correct public key from WIF', () => {
    const keyPair = fromWIF(wif)

    expect(keyPair.publicKey).toBe(publicKey)
    expect(keyPair.privateKey).toBe(privateKey)
  })

  it('should get correct public key from passphrase', () => {
    const keyPair = fromMnemonic(mnemonic, passphrase)

    expect(keyPair.publicKey).toBe(mnemonicPublicKey)
    expect(keyPair.privateKey).toBe(mnemonicPrivateKey)
  })
})
