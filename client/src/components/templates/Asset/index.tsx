import React, { Component } from 'react'
import { DDO, MetaData, Logger } from '@nevermined-io/nevermined-sdk-js'
import Route from '../Route'
import Spinner from '../../atoms/Spinner'
import { User } from '../../../context'
import AssetDetails from './AssetDetails'
import stylesApp from '../../../App.module.scss'
import Content from '../../atoms/Content'
import CategoryImage from '../../atoms/CategoryImage'
import styles from './index.module.scss'
import withTracker from '../../../hoc/withTracker'
import Web3message from '../../organisms/Web3message'

interface AssetProps {
    match: {
        params: {
            did: string
        }
    }
}

interface AssetState {
    ddo: DDO
    metadata: MetaData
    error: string
    isLoading: boolean
}

class Asset extends Component<AssetProps, AssetState> {
    public static contextType = User

    public state = {
        ddo: ({} as any) as DDO,
        metadata: ({ main: { name: '' } } as any) as MetaData,
        error: '',
        isLoading: true
    }

    public async componentDidMount() {
        this.getData()
    }

    private async getData() {
        try {
            const { sdk } = this.context
            const ddo = await sdk.assets.resolve(this.props.match.params.did)
            const { attributes } = ddo.findServiceByType('metadata')
            this.setState({
                ddo,
                metadata: attributes,
                isLoading: false
            })
        } catch (error) {
            Logger.error(error.message)
            this.setState({
                error: `We encountered an error: ${error.message}.`
            })
        }
    }

    public render() {
        const { metadata, ddo, error, isLoading } = this.state
        const { main, additionalInformation } = metadata

        const hasError = error !== ''

        return isLoading && !hasError ? (
            <div className={stylesApp.loader}>
                <Spinner message="Loading asset..." />
            </div>
        ) : hasError ? (
            <Content>
                <div className={styles.error}>{error}</div>
                <Web3message />
            </Content>
        ) : (
            <Route
                title={main.name}
                image={
                    additionalInformation &&
                    additionalInformation.categories && (
                        <CategoryImage
                            header
                            dimmed
                            category={additionalInformation.categories[0]}
                        />
                    )
                }
            >
                <Content>
                    <AssetDetails metadata={metadata} ddo={ddo} />
                </Content>
            </Route>
        )
    }
}

export default withTracker(Asset)
