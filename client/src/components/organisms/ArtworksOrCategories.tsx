import React, { useContext, useState } from 'react'
import styles from './ArtworksOrCategories.module.scss'
import { ButtonToggle, ToggleOption } from '../molecules/ButtonToggle'
import ArtworksRecent from './ArtworksRecent'
import { Market } from '../../context'
import { Categories } from './Categories'

enum Selected {
    'artworks',
    'categories'
}

export const ArtworksOrCategories = () => {
    const market = useContext(Market)
    const [selected, setSelected] = useState<Selected>(Selected.artworks)
    const buttonToggleOptions: ToggleOption[] = [{
        content: 'Recent',
        onClick: () => setSelected(Selected.artworks)
    }, {
        content: 'Categories',
        onClick: () => setSelected(Selected.categories)
    }]

    return <>
        <div className={styles.artworksOrCategoriesWrap}>
            <div className={styles.artworksOrCategoriesHeader}>
                <div className={styles.artworksOrCategoriesTitle}>
                    {selected === Selected.artworks ?
                        'Recent Artwork' :
                        'Categories'
                    }
                </div>
                <ButtonToggle options={buttonToggleOptions}/>
            </div>
            {selected === Selected.artworks ?
                <ArtworksRecent categories={market.categories}/> :
                <Categories/>
            }
        </div>
    </>
}
