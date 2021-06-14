import React from 'react'
import { IconProps } from './icons.interface'

export const FullscreenIcon = ({color = 'currentColor', size = 24}: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18 0V6H16V3.41L12.71 6.71L11.29 5.29L14.59 2H12V0H18ZM0 0V6H2V3.41L5.29 6.71L6.71 5.29L3.41 2H6V0H0ZM18 18V12H16V14.59L12.71 11.3L11.3 12.71L14.59 16H12V18H18ZM6 18V16H3.41L6.7 12.71L5.29 11.29L2 14.59V12H0V18H6Z"
                style={{fill: color}}/>
        </svg>
    )
}
