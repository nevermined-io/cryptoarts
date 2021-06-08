import styles from '../../routes/Home/index.module.scss'
import CategoryLink from '../atoms/CategoryLink'
import CategoryImage from '../atoms/CategoryImage'
import React, { useContext } from 'react'
import { Market } from '../../context'

export const Categories = () => {
    const market = useContext(Market)
    return <>
        <div className={styles.categories}>
            {market.categories
                .sort((a: any, b: any) => a.localeCompare(b)) // sort alphabetically
                .map((category: string) => (
                    <CategoryLink
                        category={category}
                        key={category}
                        className={styles.category}
                    >
                        <CategoryImage category={category} />
                        <h3>{category}</h3>
                    </CategoryLink>
                ))}
        </div>
    </>
}
