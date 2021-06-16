import React, { useContext, useState } from 'react'
import styles from './ArtworksOrCategories.module.scss'
import { ButtonToggle, ToggleOption } from '../molecules/ButtonToggle'
import ArtworksRecent from './ArtworksRecent'
import { Market } from '../../context'
import { Categories } from './Categories'
import Search from '../molecules/Search'

enum Selected {
    'artworks',
    'categories'
}

export const ArtworksOrCategories = ({searchAssets}: {searchAssets: any}) => {
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
                <ButtonToggle options={buttonToggleOptions}/>
            </div>

            <Search searchAssets={searchAssets} />

            {selected === Selected.artworks ?
                <ArtworksRecent categories={market.categories}/> :
                <Categories/>
            }
        </div>
    </>
}
