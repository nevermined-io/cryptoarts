import React, { useContext } from 'react'
import styles from './ArtworksOrCategories.module.scss'
import { ButtonToggle, ToggleOption } from '../molecules/ButtonToggle'
import ArtworksRecent from './ArtworksRecent'
import { Market } from '../../context'

export const ArtworksOrCategories = () => {
    const market = useContext(Market)
    const buttonToggleOptions: ToggleOption[] = [{
        content: 'Recent',
        onClick: () => alert('hey')
    }, {
        content: 'Categories',
        onClick: () => alert('hey')
    }]

    return <>
        <div className={styles.artworksOrCategoriesWrap}>
            <div className={styles.artworksOrCategoriesHeader}>
                <div className={styles.artworksOrCategoriesTitle}>Recent Artwork</div>
                <ButtonToggle options={buttonToggleOptions}/>
            </div>
            <ArtworksRecent categories={market.categories}/>
        </div>
    </>
}
