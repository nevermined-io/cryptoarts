import React, { useState } from 'react'
import { toDataUrl } from 'ethereum-blockies'
import cx from 'classnames'

import { User, Market } from '../../context'
import styles from './AccountStatus.module.scss'

import CircleButton from '../atoms/CircleButton'
import { AccountConnectedIcon, AccountNotConnectedIcon, ArrowRightIcon, DisconnectIcon } from '../icons'

export const AccountStatus = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    return (
        <User.Consumer>
            {({account, loginMetamask, isLogged}) => (
                <div className={styles.wrapper}>
                    {isLogged
                        ? (
                            <div onMouseOver={() => setIsPopoverOpen(true)} onMouseOut={() => setIsPopoverOpen(false)}>
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

export default AccountStatus
