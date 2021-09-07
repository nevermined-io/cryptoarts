import React from 'react'
import { IconProps, DirectionProps, directionPropsToAngle } from './icons.interface'

export const ShortArrowIcon = (props: IconProps & DirectionProps) => {
    const {color = 'currentColor', size = 24} = props
    const rotation = directionPropsToAngle(props) - 90
    return (
        <svg width={size} height={size} style={{transform: `rotate(${rotation}deg)`}} viewBox="-5 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.69859 17.4844L10.1836 8.99938L1.69859 0.514374L0.283594 1.92837L7.35559 8.99938L0.283594 16.0704L1.69859 17.4844Z" style={{fill: color}}/>
        </svg>
    )
}
