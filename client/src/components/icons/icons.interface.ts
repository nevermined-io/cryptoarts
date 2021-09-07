export interface IconProps {
    color?: string
    size?: number
}

export interface DirectionProps {
    left?: boolean
    right?: boolean
    up?: boolean
    down?: boolean
}

export function directionPropsToAngle(directions: DirectionProps) {
    switch (true) {
        default:
        case directions.up:
            return 0
        case directions.right: return 90
        case directions.down: return 180
        case directions.left: return 270
    }
}
