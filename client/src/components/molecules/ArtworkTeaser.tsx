import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Dotdotdot from 'react-dotdotdot'
import cx from 'classnames'
import styles from './ArtworkTeaser.module.scss'
import { allowPricing } from '../../config'
import Web3 from 'web3'
import ArtworkTeaserImage from '../atoms/ArtworkTeaserImage'

import artworkImage from '../../img/artwork.png'

const ArtworkTeaser = ({
    artwork: artwork,
    list,
    minimal,
    tokenSymbol
}: {
    artwork: any
    list?: boolean
    minimal?: boolean
    tokenSymbol?: string
}) => {
    const { attributes } = artwork.findServiceByType('metadata')
    const { main, additionalInformation } = attributes

    return list ? (
        <article className={styles.assetList}>
            <Link to={`/asset/${artwork.id}`}>
                <h1>{main.name}</h1>
                <div
                    className={styles.date}
                    title={`Published on ${main.datePublished}`}
                >
                    {moment(main.datePublished).fromNow()}
                </div>
            </Link>
        </article>
    ) : (
        <article
            className={
                minimal ? cx(styles.asset, styles.minimal) : styles.asset
            }
        >
            <Link to={`/asset/${artwork.id}`}>
                <ArtworkTeaserImage
                            header
                            dimmed
                            image={artworkImage}
                />

                <h1>{main.name}</h1>

                {!minimal && (
                    <div className={styles.description}>
                        <Dotdotdot clamp={3}>
                            {additionalInformation.description}
                        </Dotdotdot>
                    </div>
                )}
                <footer className={styles.assetFooter}>
                    {allowPricing && (
                        <div className={styles.price}>
                            <span>
                                {Web3.utils.fromWei(main.price.toString())}
                            </span>{' '}
                             {tokenSymbol}
                        </div>
                    )}
                </footer>
            </Link>
        </article>
    )
}

export default ArtworkTeaser
