import React from 'react'
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
    main,
    sidebar
}: {
    main: React.ReactNode
    sidebar: React.ReactNode
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {main}
            </div>
            <div className={styles.sidebar}>
                {sidebar}
            </div>
        </div>
    )
}

export default FullHeightView
