import React from 'react'
import cx from 'classnames'

import styles from './Steps.module.scss'

interface StepProps {
    children: string
}
export const Step = ({children}: StepProps) => {
    return <>{children}</>
}

const Steps = ({
    step,
    children,
    className,
}: {
    step: number
    children: React.ReactElement<StepProps>[]
    className?: string
}) => {
    console.log(styles)
    const length = children.length
    return (
        <div className={cx(styles.wrapper, className)}>
            {children.slice(0).reverse().map((stepLabel, i) => (
                <React.Fragment key={i}>
                    {((length - i) === step) && <span className={styles.enabled}/>}
                    <div className={styles.label}>{stepLabel}</div>
                    <div className={styles.number}>{length - i}</div>
                    {(i + 1) < length && (<div className={styles.dash}/>)}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Steps
