import { Nevermined, Logger } from '@nevermined-io/nevermined-sdk-js'
import Web3 from 'web3'

import {
    metadataUri,
    gatewayUri,
    gatewayAddress,
    faucetUri,
    nodeUri,
    secretStoreUri,
    verbose
} from './config'

export async function provideNevermined(web3Provider: Web3) {
    const config = {
        web3Provider,
        nodeUri,
        metadataUri,
        gatewayUri,
        gatewayAddress,
        secretStoreUri,
        verbose
    }
    const sdk: any = await Nevermined.getInstance(config)
    return { sdk }
}

//
// Faucet
//
export interface FaucetResponse {
    success: boolean
    message: string
    trxHash?: string
}

export async function requestFromFaucet(account: string) {
    try {
        const url = `${faucetUri}/faucet`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: account,
                agent: 'commons'
            })
        })
        return response.json()
    } catch (error) {
        Logger.error('requestFromFaucet', error.message)
    }
}
