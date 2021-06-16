import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import cx from 'classnames'
import { DDO } from '@nevermined-io/nevermined-sdk-js'
import Web3 from 'web3'

import { User } from '../../context'
import styles from './ArtworkTeaser.module.scss'

const ArtworkTeaser = ({
    artwork,
    cover,
    className,
}: {
    artwork: DDO & {url?: string}
    cover?: boolean
    className?: string
    // TODO: Remove following props
    minimal?: any
    tokenSymbol?: any
    list?: any
}) => {
    const {tokenSymbol} = useContext(User)
    const { attributes: {main} } = artwork.findServiceByType('metadata')

    return list ? (

    return (
        <Link to={`/asset/${artwork.id}`}
            className={cx(styles.container, className)}
            style={{
                backgroundImage: `url(${artwork.url})`,
                backgroundSize: cover ? 'cover' : 'contain',
            }}
        >
            {cover && <div className={styles.details}>
                <h3 className={styles.detailsTitle}>{main.name}</h3>
                <div className={styles.detailsSubtitle}>{main.author}</div>
                <div className={styles.detailsFooter}>
                    <span>{Web3.utils.fromWei(main.price.toString())}{' '}{tokenSymbol}</span>
                    <strong>See details</strong>
                </div>
            </div>}
        </Link>
    )
}

export default ArtworkTeaser
