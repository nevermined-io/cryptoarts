import React, { useContext } from 'react'
import Route from '../../components/templates/Route'
import { Market } from '../../context'
import Web3message from '../../components/organisms/Web3message'
import Content from '../../components/atoms/Content'
import withTracker from '../../hoc/withTracker'
import { showRequestTokens } from '../../config'
import Action from './Action'
import styles from './index.module.scss'

function Faucet() {
    const { network } = useContext(Market)

    return (
        <Route
            title="Faucet"
            description={`Shower yourself with some ETH ${
                showRequestTokens ? 'or NEVERMINED' : ''
            } for Nevermined's ${network} network.`}
        >
            <Content>
                <Web3message />

                <div className={styles.actions}>
                    <Action token="ETH" />
                    {showRequestTokens && <Action token="NEVERMINED" />}
                </div>
            </Content>
        </Route>
    )
}

export default withTracker(Faucet)
