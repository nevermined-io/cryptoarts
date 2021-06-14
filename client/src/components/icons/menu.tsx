import React from 'react'
import { IconProps } from './icons.interface'

export const MenuIcon = ({color = 'currentColor', size = 24}: IconProps) => {
    return (
        <svg width={size} height={size * 12 / 18} viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 12H0V10H18V12ZM18 7H0V5H18V7ZM18 2H0V0H18V2Z" style={{fill: color}}/>
        </svg>
    )
}
