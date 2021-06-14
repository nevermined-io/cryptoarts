import React from 'react'
import { IconProps } from './icons.interface'

export const ArrowRightIcon = ({color = 'currentColor', size = 24}: IconProps) => {
    return (
        <svg width={size} height={size * 10 / 20} viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.17 6L13.59 8.59L15 10L20 5L15 0L13.59 1.41L16.17 4H0V6H16.17Z" style={{fill: color}}/>
        </svg>
    )
}
