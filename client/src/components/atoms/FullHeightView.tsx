import React from 'react'
import cx from 'classnames'

import styles from './FullHeightView.module.scss'

export const ContentRow = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className={styles.contentRow}>
            {children}
        </div>
    )
}

const FullHeightView = ({
    fullscreen,
    main,
    sidebar,
    subsidebar
}: {
    fullscreen?: boolean
    main: React.ReactNode
    sidebar: React.ReactNode
    subsidebar?: React.ReactNode
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {main}
            </div>
            <div className={cx(styles.sidebar, fullscreen ? styles.sidebarClosed : undefined)}>
                <div className={styles.sidebarContent}>
                    {sidebar}
                </div>
                {subsidebar && (<div className={styles.subsidebar}>
                    {subsidebar}
                </div>)}
            </div>
        </div>
    )
}

export default FullHeightView
