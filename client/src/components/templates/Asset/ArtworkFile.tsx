import React, { PureComponent } from 'react'
import { Logger, DDO, File, Account } from '@nevermined-io/nevermined-sdk-js'
import Button from '../../atoms/Button'
import Spinner from '../../atoms/Spinner'
import { User, Market } from '../../../context'
import styles from './ArtworkFile.module.scss'
import ReactGA from 'react-ga'
import Modal from '../../atoms/Modal'

export const messages: any = {
    99: 'Decrypting file URL...',
    0: '1/3<br />Checking balance...',
    1: '2/3<br />Locking payment...',
    2: '2/3<br />Payment confirmed. Requesting access...',
    3: '3/3<br /> Access granted. Consuming file...'
}

interface ArtworkFileProps {
    file: File
    ddo: DDO
    price: number
}

interface ArtworkFileState {
    isLoading: boolean
    error: string
    step: number
    isModalOpen: boolean
    unsoldNfts: number
}

export default class ArtworkFile extends PureComponent<
    ArtworkFileProps,
    ArtworkFileState
> {
    public static contextType = User

    public state = {
        isLoading: false,
        error: '',
        step: 99,
        isModalOpen: false,
        unsoldNfts: 0,
    }

    public componentDidMount() {
        this.getUnsoldNfts()
    }

    private handleToggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })

        const { ddo, file } = this.props
        const { index } = file

        this.purchaseAsset(ddo, index ?? -1)
    }

    private resetState = () =>
        this.setState({
            isLoading: true,
            error: '',
            step: 99,
        })

    private getUnsoldNfts = async () => {
        const { ddo } = this.props
        const { sdk } = this.context
        const { owner } = await sdk.nfts.details(ddo.id)
        const account = new Account(owner)

        sdk.nfts.balance(ddo.id, account)
            .then((balance: string)  => {
                this.setState({ unsoldNfts: Number(balance) })
                console.log(balance)
            })
    }

    private purchaseAsset = async (ddo: DDO, index: number) => {
        this.resetState()

        ReactGA.event({
            category: 'Purchase',
            action: 'purchaseAsset-start ' + ddo.id
        })

        const { sdk } = this.context

        try {
            const accounts = await sdk.accounts.list()

            // check balance
            this.setState({ step: 0 })
            const balance = await accounts[0].getNeverminedBalance()
            if (balance < this.props.price) {
                throw Error(`Not Enough balance: ${balance}`)
            }

            // order nft and lock payment
            this.setState({ step: 1 })
            await sdk.nfts
                .order(ddo.id, 1, accounts[0])

            // requesting access
            this.setState({ step: 2 })
            const path = await sdk.nfts.access(ddo.id, accounts[0])
            this.setState({ step: 3 })

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

    private renderSuccessful() {
        return (
            <div className={styles.modal}>
                <div
                    className={styles.iconSuccessful}
                />
                <div className={styles.text}>
                    <span>Purchase Successful!</span>
                    <p>Congratulations, you were able to sucessfully purchase this artwork</p>
                </div>
                <Button
                    primary
                    className={styles.buttonSuccessful}
                    onClick={this.handleToggleModal}
                >
                    Complete
                </Button>
            </div>
        )
    }

    private renderFailed() {
        const { error } = this.state

        return (
            <div className={styles.modal}>
                <div
                    className={styles.iconFailed}
                />
                <div className={styles.text}>
                    <span>Purchase Failed!</span>
                    <p>{error}</p>
                </div>
                <Button
                    primary
                    className={styles.buttonFailed}
                    onClick={this.handleToggleModal}
                >
                    Return
                </Button>
            </div>
        )
    }

    private renderModalContent() {
        const { error } = this.state

        if (error !== '') {
            return this.renderFailed()
        } else {
            return this.renderSuccessful()
        }
    }

    public render() {
        const { isLoading, step, unsoldNfts } = this.state
        const { isLogged } = this.context

        return (
            <div>
                <Market.Consumer>
                    {market => (
                        <Button
                            primary
                            className={styles.button}
                            onClick={this.handleToggleModal}
                            disabled={!isLogged || !market.networkMatch || unsoldNfts < 1}
                            name="Download"
                        >
                            {unsoldNfts > 0 ? 'Purchase' : 'Sold Out'}
                        </Button>
                    )}
                </Market.Consumer>

                <Modal
                    title=''
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.handleToggleModal}
                    overrideButton={true}
                >
                    {isLoading ? (
                        <Spinner message={messages[step]} />
                        ) : (
                            <>
                                {this.renderModalContent()}
                            </>
                        )
                    }
                </Modal>
            </div>
        )
    }
}
