import React, { PureComponent } from 'react'
import Web3 from 'web3'
import styles from './ArtworkTeaserDescription.module.scss'

export default class ArtworkTeaserDescription extends PureComponent<{
    name: string
    description?: string
    price: string
    date?: string
    tokenSymbol?: string
}> {
    public render() {
        return (
            <div className={styles.artworkTeaserDescription}>
                <div className={styles.text}>
                    <h1>{this.props.name}</h1>
                    {this.props.description}
                </div>

                <div className={styles.footer}>
                    <div className={styles.price}>
                        {Web3.utils.fromWei(this.props.price.toString())}{' '}{this.props.tokenSymbol}
                    </div>
                    <div className={styles.date}>
                        {this.props.date}
                    </div>
                </div>
            </div>
        )
    }
}
