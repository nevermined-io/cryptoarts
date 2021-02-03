import React, { PureComponent } from 'react'
import cx from 'classnames'
import styles from './ArtworkTeaserImage.module.scss'

export default class ArtworkTeaserImage extends PureComponent<{
    image: string
    header?: boolean
    dimmed?: boolean
}> {
    public render() {
        return (
            <div
                className={styles.artworkTeaserImage}
                style={{ backgroundImage: `url(${this.props.image})` }}
            />
        )
    }
}
