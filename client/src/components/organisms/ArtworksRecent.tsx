import React, { PureComponent, useContext } from 'react'
import { Logger } from '@nevermined-io/nevermined-sdk-js'
import { Market, User } from '../../context'
import Spinner from '../atoms/Spinner'
import ArtworkTeaser from '../molecules/ArtworkTeaser'
import styles from './ArtworksRecent.module.scss'
import axios from 'axios'
import { serviceUri } from '../../config'
import { ButtonToggle, ToggleOption } from '../molecules/ButtonToggle'


interface ArtworksRecentState {
    latestArtworks?: any[]
    isLoadingLatest?: boolean
}

export default class ArtworksRecent extends PureComponent<{categories: string[]}, ArtworksRecentState> {
    public state = { latestArtworks: [], isLoadingLatest: true }

    public _isMounted = false

    public componentDidMount() {
        this._isMounted = true
        this._isMounted && this.getLatestAssets()
    }

    public componentWillUnmount() {
        this._isMounted = false
    }

    private getLatestAssets = async () => {
        const { sdk } = this.context
        const searchQuery = {
            offset: 15,
            page: 1,
            query: {
                categories: this.props.categories
            },
            sort: {
                created: -1
            }
        }

        try {
            const search = await sdk.assets.query(searchQuery)
            this.setState({
                latestArtworks: search.results,
                isLoadingLatest: false
            })

            search.results.map(async (artwork: any) => {
                const { attributes } = artwork.findServiceByType('metadata')
                const { compression } = attributes.main.files[0]
                const filename = `${artwork.id}.${compression}`
                const response = await axios({
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    url: `${serviceUri}/api/v1/file/${filename}`,
                })

                console.log(response.data.url)
                artwork.url = response.data.url
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingLatest: false })
        }
    }

    public render() {
        const { latestArtworks: latestArtworks, isLoadingLatest } = this.state
        const buttonToggleOptions: ToggleOption[] = [{
            content: 'Recent',
            onClick: () => alert('hey')
        }, {
            content: 'Categories',
            onClick: () => alert('hey')
        }]
        console.log(this.context)

        return (
            <>
                <div className={styles.latestAssetsWrap}>
                    <div className={styles.latestAssetsHeader}>
                        <div className={styles.latestAssetsHeaderTitle}>Recent Artwork</div>
                        <ButtonToggle options={buttonToggleOptions}/>
                    </div>
                    {isLoadingLatest ? (
                        <Spinner message="Loading..." />
                    ) : latestArtworks && latestArtworks.length ? (
                        <div className={styles.latestAssets}>
                            {latestArtworks.map((asset: any) => (
                                <ArtworkTeaser
                                    key={asset.id}
                                    artwork={asset}
                                    minimal
                                    tokenSymbol= {this.context.tokenSymbol}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>No artworks found.</div>
                    )}
                </div>
            </>
        )
    }
}

ArtworksRecent.contextType = User
