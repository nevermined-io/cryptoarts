import React, { useState } from 'react'
import styles from './ButtonToggle.module.scss'
import cx from 'classnames'

export type ToggleOption = {
    content: string
    onClick: Function
}

interface ButtonToggleProps {
    options: ToggleOption[]
}

export const ButtonToggle = ({ options }: ButtonToggleProps) => {
    const [selected, setSelected] = useState(1)
    return <>
        <div className={styles.buttonWrapper}>
            {options.map((option, index) => <div
                className={cx(styles.button, { [styles.selectedButton]: selected === index })}
                onClick={() => {
                    setSelected(index)
                    option.onClick()
                }}
            >{option.content}</div>)}
        </div>
    </>
}
