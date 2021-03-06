import React, { useContext, useState } from 'react'
import { FaucetResponse } from '../../nevermined'
import Button from '../../components/atoms/Button'
import Spinner from '../../components/atoms/Spinner'
import { User } from '../../context'

import styles from './Action.module.scss'
import { Nevermined } from '@nevermined-io/nevermined-sdk-js'
import { ActionError, ActionSuccess } from './ActionResponse'

const ActionMarkup = ({
    token,
    handleAction
}: {
    token: string
    handleAction: () => void
}) => {
    const { isLogged } = useContext(User)

    return (
        <>
            <Button
                primary
                onClick={handleAction}
                disabled={!isLogged}
                name={`Faucet${token}`}
            >
                {`Request ${token}`}
            </Button>
            {token === 'ETH' && (
                <p>
                    You can only request {token} once every 24 hours for your
                    address.
                </p>
            )}
        </>
    )
}

export default function Action({ token }: { token: string }) {
    const { sdk, requestFromFaucet } = useContext(User)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [trxHash, setTrxHash] = useState('')

    async function getNevermined(sdkInstance: Nevermined) {
        const accounts = await sdkInstance.accounts.list()
        const account = accounts[0]
        const success = await sdkInstance.accounts.requestTokens(account, 100)

        success
            ? setSuccess('Received 100 Nevermined Tokens.')
            : setError('Failed getting Nevermined Tokens.')
    }

    async function getEther(requestFromFaucet: () => Promise<FaucetResponse>) {
        try {
            const response = await requestFromFaucet()
            const { message, success } = response

            if (!success) {
                setError(message)
                return
            }

            const { trxHash } = response
            setSuccess(message)
            trxHash && setTrxHash(trxHash)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleAction = async () => {
        setIsLoading(true)

        token === 'NEVERMINED'
            ? await getNevermined(sdk as Nevermined)
            : await getEther(requestFromFaucet as () => Promise<FaucetResponse>)

        setIsLoading(false)
    }

    return (
        <div className={styles.action}>
            {isLoading ? (
                <Spinner message={`Getting ${token}...`} />
            ) : error ? (
                <ActionError error={error} />
            ) : success ? (
                <ActionSuccess success={success} trxHash={trxHash} />
            ) : (
                <ActionMarkup token={token} handleAction={handleAction} />
            )}
        </div>
    )
}
