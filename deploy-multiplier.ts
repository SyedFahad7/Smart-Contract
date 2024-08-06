import { DefaultProvider, bsv } from 'scrypt-ts'
import { Multiplier } from './src/contracts/multiplier'
import { NeucronSigner } from 'neucron-signer'

async function main() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet })
    const signer = new NeucronSigner(provider)
    const amount = 2

    await signer.login('sales@timechainlabs.io', 'string')
    await Multiplier.loadArtifact()

    const num1 = BigInt(3)
    const num2 = BigInt(4)
    const instance = new Multiplier(num1, num2)
    await instance.connect(signer)

    const deployTx = await instance.deploy(amount)
    console.log(
        'Multiplier contract deployed: https://whatsonchain.com/tx/' +
            deployTx.id
    )

    await new Promise((f) => setTimeout(f, 5000))
    const { tx: callTx } = await instance.methods.unlock()
    console.log(
        'Multiplier contract unlocked successfully: https://whatsonchain.com/tx/' +
            callTx.id
    )
}

main().catch(console.error)
