import React from 'react'
import { IconProps } from './icons.interface'

export const AccountConnectedIcon = ({color = 'currentColor', size = 24}: IconProps) => {
    return (
        <svg width={size} height={size * 15 / 20} viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 15H0C0 11.6863 2.68629 9 6 9C9.31371 9 12 11.6863 12 15H10C10 12.7909 8.20914 11 6 11C3.79086 11 2 12.7909 2 15ZM13.994 11.41L11.288 8.71L12.7 7.292L13.992 8.584L18.292 4.292L19.704 5.708L13.992 11.408L13.994 11.41ZM6 8C3.79086 8 2 6.20914 2 4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4C9.99724 6.208 8.208 7.99725 6 8ZM6 2C4.9074 2.00111 4.01789 2.87885 4.00223 3.97134C3.98658 5.06383 4.85057 5.9667 5.94269 5.99912C7.03481 6.03153 7.95083 5.1815 8 4.09V4.49V4C8 2.89543 7.10457 2 6 2Z" fill="#132D43"/>
        </svg>

    )
}
