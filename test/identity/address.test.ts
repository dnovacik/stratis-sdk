import { fromPrivateKey, fromPublicKey, fromWIF } from './../../src/identity/address'

const address = 'XUcQZ8tVKVyAvUYDLv5i5qKZtobHKWUwfN'
const publicKey = '03938a8568863beb36750be574cd505193dff76cd3801c9cf22299906f8c03ebe9'
const privateKey = '03b5f023e7dcc4e1160fc5bb58ee34459d14e7b3eb756260da8ec0234ab6850b18'
// const privateKey = 'd0081ffe5ad3b7d5cf8ed9406dee5742543c8804f531f18d9d58c14cc34cf37a'
const wif = 'X9gPUznqiNTQB5DvcVnm9KSye5R7JfRCYhgNCV4Y38LJUtZVaAHt'
// const passPhrase = 'render have ladder property wave afford bag morning question senior pioneer december'

fdescribe('Identity.Address tests', () => {
  it('should get proper address key from public key', () => {
    const result = fromPublicKey(publicKey)

    expect(result).toBe(address)
  })

  it('should get correct address from WIF', () => {
    const result = fromWIF(wif)

    expect(result).toBe(address)
  })

  it('should get correct address from private key', () => {
    const result = fromPrivateKey(privateKey)

    expect(result).toBe('')
  })
})
