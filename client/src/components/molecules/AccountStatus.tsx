import React, { PureComponent } from 'react'
import { toDataUrl } from 'ethereum-blockies'
import cx from 'classnames'

import { User, Market } from '../../context'
import styles from './AccountStatus.module.scss'

import CircleButton from '../atoms/CircleButton'
import { AccountConnectedIcon, AccountNotConnectedIcon, ArrowRightIcon, DisconnectIcon } from '../icons'

interface AccountStatusState {
    isPopoverOpen: boolean
}

export default class AccountStatus extends PureComponent<
    {},
    AccountStatusState
> {
    public state = {
        isPopoverOpen: false
    }

    private togglePopover() {
        this.setState(prevState => ({
            isPopoverOpen: !prevState.isPopoverOpen
        }))
    }

    render() {
        const {isPopoverOpen} = this.state
        return (
            <User.Consumer>
                {({account, loginMetamask, isLogged}) => (
                    <div className={styles.wrapper}>
                        {isLogged
                            ? (
                                <div onMouseOver={() => this.togglePopover()} onMouseOut={() => this.togglePopover()}>
                                    <CircleButton className={styles.button} secondary><AccountConnectedIcon /></CircleButton>
                                </div>
                            )
                            : <CircleButton onClick={loginMetamask}><AccountNotConnectedIcon /></CircleButton>}

                        <Market.Consumer>
                            {market => !isLogged || (
                                <div className={cx(styles.popup, isPopoverOpen ? styles.popupOpen : undefined)}>
                                    {market.networkMatch || true // <-- TODO: Remove the true
                                        ? (
                                            <>
                                                <div className={cx(styles.row, styles.account)}>
                                                    <img
                                                        className={styles.accountImage}
                                                        src={account && toDataUrl(account)}
                                                        alt="Blockies"
                                                    />
                                                    <div className={styles.accountAddress}>
                                                      {account}
                                                    </div>
                                                </div>
                                                <div className={styles.row}>
                                                    <span>Go to profile</span>
                                                    <ArrowRightIcon />
                                                </div>
                                                <div className={styles.row}>
                                                    <span>Disconnect</span>
                                                    <DisconnectIcon />
                                                </div>
                                            </>
                                        ) : (
                                            <div></div>
                                        )}
                                </div>
                            )}
                        </Market.Consumer>
                    </div>
                )}
            </User.Consumer>
        )
    }
}
