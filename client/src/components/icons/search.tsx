import React from 'react'
import { IconProps } from './icons.interface'

export const SearchIcon = ({color = 'currentColor', size = 24}: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11.5" cy="11.5" r="9.5" style={{stroke: color}} strokeWidth="4"/>
            <line x1="18.4142" y1="18.5858" x2="27.7555" y2="27.927" style={{stroke: color}} strokeWidth="4"/>
        </svg>
    )
}
