import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './CircleButton.module.scss'

interface CircleButtonProps {
    children?: JSX.Element | string
    className?: string
    large?: boolean
    primary?: boolean
    secondary?: boolean
    error?: boolean
    link?: boolean
    href?: string
    onClick?: any
    disabled?: boolean
    to?: string
    name?: string
}

function getClasses({primary, secondary, error, large}: CircleButtonProps) {
    const classes = [styles.circleButton]
    if (primary) {
        classes.push(styles.circleButtonPrimary)
    }
    if (secondary) {
        classes.push(styles.circleButtonSecondary)
    }
    if (error) {
        classes.push(styles.circleButtonError)
    }
    if (large) {
        classes.push(styles.circleButtonLarge)
    }
    return classes.join(' ')
}

const CircleButton = (props: CircleButtonProps) => {
    const {href, children, className, to, ...restProps} = props
    const classes = getClasses(props)

    return to ? (
        <Link to={to} className={cx(classes, className)} {...restProps}>
            {children}
        </Link>
    ) : href ? (
        <a href={href} className={cx(classes, className)} {...restProps}>
            {children}
        </a>
    ) : (
        <button className={cx(classes, className)} {...restProps}>
            {children}
        </button>
    )
}

export default CircleButton
