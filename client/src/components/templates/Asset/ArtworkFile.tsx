import React, { PureComponent } from 'react'
import { Logger, DDO, File } from '@nevermined-io/nevermined-sdk-js'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import { User, Market } from '../../../context'
import styles from './ArtworkFile.module.scss'
import ReactGA from 'react-ga'

export const messages: any = {
    99: 'Decrypting file URL...',
    0: '1/3<br />Asking for agreement signature...',
    1: '1/3<br />Agreement initialized.',
    2: '2/3<br />Asking for two payment confirmations...',
    3: '2/3<br />Payment confirmed. Requesting access...',
    4: '3/3<br /> Access granted. Consuming file...'
}

interface ArtworkFileProps {
    file: File
    ddo: DDO
}

interface ArtworkFileState {
    isLoading: boolean
    error: string
    step: number
}

export default class ArtworkFile extends PureComponent<
    ArtworkFileProps,
    ArtworkFileState
> {
    public static contextType = User

    public state = {
        isLoading: false,
        error: '',
        step: 99
    }

    private resetState = () =>
        this.setState({
            isLoading: true,
            error: '',
            step: 99
        })

    private purchaseAsset = async (ddo: DDO, index: number) => {
        this.resetState()

        ReactGA.event({
            category: 'Purchase',
            action: 'purchaseAsset-start ' + ddo.id
        })

        const { sdk } = this.context

        try {
            const accounts = await sdk.accounts.list()
            const service = ddo.findServiceByType('access')

            const agreements = await sdk.keeper.conditions.accessSecretStoreCondition.getGrantedDidByConsumer(
                accounts[0].id
            )
            const agreement = agreements.find((element: any) => {
                return element.did === ddo.id
            })

            let agreementId

            if (agreement) {
                ;({ agreementId } = agreement)
            } else {
                agreementId = await sdk.assets
                    .order(ddo.id, service.index, accounts[0])
                    .next((step: number) => this.setState({ step }))
            }

            // manually add another step here for better UX
            this.setState({ step: 4 })

            const path = await sdk.assets.consume(
                agreementId,
                ddo.id,
                service.index,
                accounts[0],
                undefined,
                index,
                false
            )
            Logger.log('path', path)
            ReactGA.event({
                category: 'Purchase',
                action: 'purchaseAsset-end ' + ddo.id
            })
            this.setState({ isLoading: false })
        } catch (error) {
            Logger.error('error', error.message)
            this.setState({
                isLoading: false,
                error: `${error.message}. Sorry about that, can you try again?`
            })
            ReactGA.event({
                category: 'Purchase',
                action: 'purchaseAsset-error ' + error.message
            })
        }
    }

    public render() {
        const { ddo, file } = this.props
        const { isLoading, error, step } = this.state
        const { isLogged } = this.context
        const { index } = file


        return (
            <div>
                {isLoading ? (
                    <Spinner message={messages[step]} />
                ) : (
                    <Market.Consumer>
                        {market => (
                            <Button
                                primary
                                className={styles.button}
                                onClick={() =>
                                    this.purchaseAsset(ddo, index ?? -1)
                                }
                                disabled={!isLogged || !market.networkMatch}
                                name="Download"
                            >
                                Purchase
                            </Button>
                        )}
                    </Market.Consumer>
                )}

                {error !== '' && <div className={styles.error}>{error}</div>}
            </div>
        )
    }
}
