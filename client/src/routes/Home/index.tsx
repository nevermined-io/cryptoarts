import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { Market } from '../../context'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import Search from './Search'
import withTracker from '../../hoc/withTracker'
import banner from '../../img/banner.svg'
import { ArtworksOrCategories } from '../../components/organisms/ArtworksOrCategories'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
}

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    public render() {
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <div className={styles.banner} style={{ backgroundImage: `url(${banner})` }}>
                    <div className={styles.bannerContent}>
                        <div className={styles.bannerText}>
                            <div className={styles.bannerTitle}>
                                {meta.title}
                            </div>
                            <div className={styles.bannerDescription}>
                                {meta.description}
                            </div>
                        </div>
                        <div className={styles.search}>
                            <Search searchAssets={this.searchAssets} />
                        </div>
                    </div>
                </div>

                <ArtworksOrCategories/>
            </Route>
        )
    }
}

export default withTracker(Home)
