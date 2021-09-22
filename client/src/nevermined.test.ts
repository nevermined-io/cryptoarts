import Web3 from 'web3'
import { provideNevermined, requestFromFaucet } from './nevermined'

describe('nevermined', () => {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

    it('provideNevermined can be called', async () => {
        const response = await provideNevermined(web3)
        expect(response.sdk).toBeTruthy()
    })

    it('requestFromFaucet can be called', async () => {
        const response = await requestFromFaucet('0xxxxxx')
        response &&
            expect(response.errors[0].msg).toBe('Invalid Ethereum address')
    })
})
