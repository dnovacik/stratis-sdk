import { fromPrivateKey, fromWIF } from './../../src/identity/keys'

// const address = 'XUcQZ8tVKVyAvUYDLv5i5qKZtobHKWUwfN'
const publicKey = '03938a8568863beb36750be574cd505193dff76cd3801c9cf22299906f8c03ebe9'
const privateKey = 'd0081ffe5ad3b7d5cf8ed9406dee5742543c8804f531f18d9d58c14cc34cf37a'
const wif = 'X9gPUznqiNTQB5DvcVnm9KSye5R7JfRCYhgNCV4Y38LJUtZVaAHt'
// const passPhrase = 'render have ladder property wave afford bag morning question senior pioneer december'

describe('Identity.Keys tests', () => {
  it('should get proper public key from private key', () => {
    const privateKey = fromWIF(wif).privateKey
    const keyPair = fromPrivateKey(privateKey)

    expect(keyPair.publicKey).toBe(publicKey)
  })

  it ('should get proper public key from wif', () => {
    const keyPair = fromWIF(wif)

    expect(keyPair.publicKey).toBe(publicKey)
    expect(keyPair.privateKey).toBe(privateKey)
  })
})
