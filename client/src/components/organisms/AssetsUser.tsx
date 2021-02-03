import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Logger } from '@nevermined-io/nevermined-sdk-js'
import { User } from '../../context'
import Spinner from '../atoms/Spinner'
import ArtworkTeaser from '../molecules/ArtworkTeaser'
import styles from './AssetsUser.module.scss'

export default class AssetsUser extends PureComponent<
    { list?: boolean; recent?: number },
    { results: any[]; isLoading: boolean }
> {
    public static contextType = User

    public state = { results: [], isLoading: true }

    public _isMounted = false

    public componentDidMount() {
        this._isMounted = true
        this._isMounted && this.searchNevermined()
    }

    public componentWillUnmount() {
        this._isMounted = false
    }

    private async searchNevermined() {
        const { account, sdk } = this.context

        if (account) {
            sdk.keeper.didRegistry.contract.getPastEvents(
                'DIDAttributeRegistered',
                {
                    filter: { _owner: account },
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                async (error: any, events: any) => {
                    if (error) {
                        Logger.log('error retrieving', error)
                        this._isMounted && this.setState({ isLoading: false })
                    } else {
                        const results = []
                        for (const event of events) {
                            const ddo = await sdk.assets.resolve(
                                `did:nv:${event.returnValues._did.substring(2)}`
                            )
                            results.push(ddo)
                        }
                        this._isMounted &&
                            this.setState({ results, isLoading: false })
                    }
                }
            )
        } else {
            this.setState({ isLoading: false })
        }
    }

    public render() {
        const { account } = this.context
        const { recent, list } = this.props
        const { isLoading, results } = this.state

        if (!account) return null

        return (
            <div className={styles.assetsUser}>
                {this.props.recent && (
                    <h2 className={styles.subTitle}>
                        Your Latest Published Data Sets
                    </h2>
                )}

                {isLoading ? (
                    <Spinner />
                ) : results.length ? (
                    <>
                        {results
                            .slice(0, recent || undefined)
                            .filter(asset => !!asset)
                            .map((asset: any) => (
                                <ArtworkTeaser
                                    list={list}
                                    key={asset.id}
                                    artwork={asset}
                                    tokenSymbol={this.context.tokenSymbol}
                                />
                            ))}
                        {recent && (
                            <Link className={styles.link} to="/history">
                                All Data Sets
                            </Link>
                        )}
                    </>
                ) : (
                    <div className={styles.empty}>
                        <p>No Data Sets Yet.</p>
                        <Link to="/publish">+ Publish A Data Set</Link>
                    </div>
                )}
            </div>
        )
    }
}
