import React, { PureComponent } from 'react'
import { Logger } from '@nevermined-io/nevermined-sdk-js'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import ArtworkTeaser from '../molecules/ArtworkTeaser'
import styles from './ArtworksRecent.module.scss'

interface ArtworksRecentState {
    latestArtworks?: any[]
    isLoadingLatest?: boolean
}

export default class ArtworksRecent extends PureComponent<{}, ArtworksRecentState> {
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
            query: {},
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
        } catch (error) {
            Logger.error(error.message)
            this.setState({ isLoadingLatest: false })
        }
    }

    public render() {
        const { latestArtworks: latestArtworks, isLoadingLatest } = this.state
        console.log(this.context)

        return (
            <>
                <h2 className={styles.title}>Recent Artwork</h2>
                <div className={styles.latestAssetsWrap}>
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
