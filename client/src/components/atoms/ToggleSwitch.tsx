import React from 'react'
import styles from './ToggleSwitch.module.scss'

type Props = {
    active: boolean
    setActive: (val: boolean) => void
}

export const ToggleSwitch = ({ active, setActive }: Props) =>
    <div className={styles.wrapper} onClick={() => setActive(!active)}>
        <div className={active ? [styles.slider, styles.active].join(' ') : styles.slider}></div>
    </div>
