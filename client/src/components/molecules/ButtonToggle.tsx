import React, { useState } from 'react'
import styles from './ButtonToggle.module.scss'
import cx from 'classnames'

export type ToggleOption = {
    content: string
    onClick: () => void
}

interface IButtonToggleProps {
    options: ToggleOption[]
}

export const ButtonToggle = ({ options }: IButtonToggleProps) => {
    const [selected, setSelected] = useState(0)
    return <>
        <div className={styles.buttonWrapper}>
            {options.map((option, index) => <div
                className={cx(styles.button, { [styles.selectedButton]: selected === index })}
                key={index}
                onClick={() => {
                    setSelected(index)
                    option.onClick()
                }}
            >{option.content}</div>)}
        </div>
    </>
}