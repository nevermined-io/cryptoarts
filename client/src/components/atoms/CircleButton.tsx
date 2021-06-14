import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './CircleButton.module.scss'

interface CircleButtonProps {
    children?: JSX.Element | string
    className?: string
    secondary?: boolean
    link?: boolean
    href?: string
    onClick?: any
    disabled?: boolean
    to?: string
    name?: string
}

function getClasses(secondary: boolean | undefined) {
    return styles.circleButton + (secondary ? ` ${styles.circleButtonSecondary}` : '')
}

const CircleButton = ({
    secondary,
    link,
    href,
    children,
    className,
    to,
    ...props
}: CircleButtonProps) => {
    const classes = getClasses(secondary)
    console.log({classes, secondary, styles})

    return to ? (
        <Link to={to} className={cx(classes, className)} {...props}>
            {children}
        </Link>
    ) : href ? (
        <a href={href} className={cx(classes, className)} {...props}>
            {children}
        </a>
    ) : (
        <button className={cx(classes, className)} {...props}>
            {children}
        </button>
    )
}

export default CircleButton