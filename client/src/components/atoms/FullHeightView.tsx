import React from 'react'
import styles from './FullHeightView.module.scss'

const FullHeightView = ({
    main,
    sidebar
}: {
    main: JSX.Element
    sidebar: JSX.Element
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
