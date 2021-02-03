import React from 'react'
import Content from '../atoms/Content'
import styles from './Route.module.scss'
import Markdown from '../atoms/Markdown'
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
    image,
    shareImage,
    wide,
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
                <header className={styles.header}>

                </header>

                {children}
            </article>
        </div>
    )
}

export default Route
