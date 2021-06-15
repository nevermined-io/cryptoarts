import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
    children: string
    className?: string
    fullWidth?: boolean
    primary?: boolean
    secondary?: boolean
    link?: boolean
    href?: string
    onClick?: any
    disabled?: boolean
    to?: string
    name?: string
}

function getClasses(primary: boolean | undefined, secondary: boolean | undefined, link: boolean | undefined) {
    return primary ? styles.buttonPrimary : secondary ? styles.buttonSecondary : link ? styles.link : styles.button
}

const Button = ({
    fullWidth,
    primary,
    secondary,
    link,
    href,
    children,
    className,
    to,
    ...props
}: ButtonProps) => {
    const classes = cx(getClasses(primary, secondary, link), fullWidth ? styles.fullWidth : undefined)

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

export default Button
