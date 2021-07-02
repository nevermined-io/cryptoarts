import React, { PureComponent } from 'react'
import { Logger } from '@nevermined-io/nevermined-sdk-js'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import ArtworkTeaser from '../molecules/ArtworkTeaser'
import styles from './ArtworksRecent.module.scss'
import axios from 'axios'
import { serviceUri } from '../../config'


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
            offset: 20,
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
            await Promise.all(search.results.map(async (artwork: any) => {
                const { attributes } = artwork.findServiceByType('metadata')
                const { compression } = attributes.main.files[0]
                const filename = `${artwork.id}.${compression}`
                const response = await axios({
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    url: `${serviceUri}/api/v1/file/${filename}`,
                })

                artwork.url = response.data.url
            }))
            this.setState({
                latestArtworks: search.results,
                isLoadingLatest: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingLatest: false })
        }
    }

    public render() {
        const { latestArtworks, isLoadingLatest } = this.state
        console.log(this.context)

        return (
            <>
                {isLoadingLatest ? (
                    <Spinner message="Loading..." />
                ) : latestArtworks && latestArtworks.length ? (
                    <div className={styles.latestAssets}>
                        {latestArtworks.map((asset: any) => (
                            <ArtworkTeaser
                                className={styles.assets}
                                key={asset.id}
                                artwork={asset}
                                cover
                            />
                        ))}
                    </div>
                ) : (
                    <div>No artworks found.</div>
                )}
            </>
        )
    }
}

ArtworksRecent.contextType = User
