import React from 'react'
import Seo from '../atoms/Seo'

interface RouteProps {
    title: string
    description?: string
    image?: any
    shareImage?: string
    children: any
    wide?: boolean
    className?: string
}

const Route = ({
    title,
    description,
    shareImage,
    children,
    className
}: RouteProps) => {
    // Strip HTML from passed title
    const titleSanitized = title.replace(/(<([^>]+)>)/gi, '')

    return (
        <div className={className}>
            <Seo
                title={titleSanitized}
                description={description}
                shareImage={shareImage}
            />

            <article>
                {children}
            </article>
        </div>
    )
}

export default Route
