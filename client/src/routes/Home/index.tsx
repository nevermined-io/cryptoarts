import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { Market } from '../../context'
import CategoryImage from '../../components/atoms/CategoryImage'
import CategoryLink from '../../components/atoms/CategoryLink'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'

import meta from '../../data/meta.json'
import Content from '../../components/atoms/Content'
import ArtworksRecent from '../../components/organisms/ArtworksRecent'
import ChannelTeaser from '../../components/organisms/ChannelTeaser'
import Search from './Search'
import withTracker from '../../hoc/withTracker'
import { showChannels } from '../../config'
import banner from '../../img/banner.svg'

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


                <ArtworksRecent />


                {/* <Content wide>
                    <h2 className={styles.title}>Explore Categories</h2>
                    <div className={styles.categories}>
                        {this.context.categories
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
                </Content> */}
            </Route>
        )
    }
}

export default withTracker(Home)
