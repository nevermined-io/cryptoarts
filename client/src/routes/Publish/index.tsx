import React, { ChangeEvent, Component, FormEvent } from 'react'
import { Logger, File, Nevermined } from '@nevermined-io/nevermined-sdk-js'
import Web3 from 'web3'

import Route from '../../components/templates/Route'
import Form from '../../components/atoms/Form/Form'
import AssetModel from '../../models/AssetModel'
import { User, Market } from '../../context'
import Step from './Step'
import Progress from './Progress'
import ReactGA from 'react-ga'
import { allowPricing } from '../../config'
import { steps } from '../../data/form-publish.json'
import withTracker from '../../hoc/withTracker'
import { serviceUri } from '../../config'
import axios from 'axios'
import styles from './index.module.scss'
import AssetRewards from '@nevermined-io/nevermined-sdk-js/dist/node/models/AssetRewards'


type AssetType = 'dataset' | 'algorithm' | 'container' | 'workflow' | 'other'

interface PublishState {
    name?: string
    dateCreated?: string
    price?: string
    nftAmount?: number
    royalty?: number
    author?: string
    license?: string
    description?: string
    files?: File[]
    type?: AssetType
    copyrightHolder?: string
    categories?: string

    currentStep?: number
    publishingStep?: number
    isPublishing?: boolean
    isPublished?: boolean
    publishedDid?: string
    publishingError?: string
    validationStatus?: any
}

class Publish extends Component<{}, PublishState> {
    public static contextType = User

    public state = {
        name: '',
        dateCreated: new Date().toISOString(),
        description: '',
        files: [],
        price: '0',
        nftAmount: 1,
        royalty: 10,
        author: '',
        type: 'dataset' as AssetType,
        license: '',
        copyrightHolder: '',
        categories: '',

        currentStep: 1,
        isPublishing: false,
        isPublished: false,
        publishedDid: '',
        publishingError: '',
        publishingStep: 0,
        validationStatus: {
            1: { name: false, files: false, allFieldsValid: false },
            2: {
                description: false,
                categories: false,
                allFieldsValid: false
            },
            3: {
                author: false,
                copyrightHolder: false,
                license: false,
                allFieldsValid: false
            }
        }
    }

    private inputChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        this.validateInputs(event.currentTarget.name, event.currentTarget.value)

        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    private next = () => {
        let { currentStep } = this.state
        const totalSteps = steps.length

        currentStep =
            currentStep >= totalSteps - 1 ? totalSteps : currentStep + 1

        ReactGA.event({
            category: 'Publish',
            action: 'nextStep ' + currentStep
        })

        this.setState({ currentStep })
    }

    private prev = () => {
        let { currentStep } = this.state
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({ currentStep })
    }

    private tryAgain = () => {
        this.setState({ publishingError: '' })
    }

    private toStart = () => {
        this.setState({
            name: '',
            dateCreated: new Date().toISOString(),
            description: '',
            files: [],
            price: '0',
            author: '',
            type: 'dataset' as AssetType,
            license: '',
            copyrightHolder: '',
            categories: '',
            isPublishing: false,
            isPublished: false,
            publishingStep: 0,
            currentStep: 1
        })
    }

    private validateInputs = (name: string, value: string) => {
        const hasContent = value.length > 0

        // Setting state for all fields
        if (hasContent) {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: true
                        }
                    }
                }),
                this.runValidation
            )
        } else {
            this.setState(
                prevState => ({
                    validationStatus: {
                        ...prevState.validationStatus,
                        [this.state.currentStep]: {
                            ...prevState.validationStatus[
                                this.state.currentStep
                            ],
                            [name]: false
                        }
                    }
                }),
                this.runValidation
            )
        }
    }

    private runValidation = () => {
        const { validationStatus } = this.state
        //
        // Step 1
        //
        if (validationStatus[1].name && validationStatus[1].files) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    1: {
                        ...prevState.validationStatus[1],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 2
        //
        if (validationStatus[2].description && validationStatus[2].categories) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    2: {
                        ...prevState.validationStatus[2],
                        allFieldsValid: false
                    }
                }
            }))
        }

        //
        // Step 3
        //
        if (
            validationStatus[3].author &&
            validationStatus[3].copyrightHolder &&
            validationStatus[3].license
        ) {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: true
                    }
                }
            }))
        } else {
            this.setState(prevState => ({
                validationStatus: {
                    ...prevState.validationStatus,
                    3: {
                        ...prevState.validationStatus[3],
                        allFieldsValid: false
                    }
                }
            }))
        }
    }

    private registerAsset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        ReactGA.event({ category: 'Publish', action: 'registerAsset-start' })

        this.setState({
            publishingError: '',
            isPublishing: true,
            publishingStep: 0
        })

        const { sdk } = this.context
        const account = await sdk.accounts.list()

        // remove `found` attribute from all File objects
        // in a new array
        const files = this.state.files.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ found, tmpUrl, ...keepAttrs }: { found: boolean; tmpUrl?: string }) => keepAttrs
        )


        const newAsset = {
            main: Object.assign(AssetModel.main, {
                type: this.state.type,
                name: this.state.name,
                datePublished: new Date().toISOString().split('.')[0] + 'Z',
                dateCreated:
                    new Date(this.state.dateCreated)
                        .toISOString()
                        .split('.')[0] + 'Z', // remove milliseconds
                author: this.state.author,
                license: this.state.license,
                price: allowPricing
                    ? Web3.utils.toWei(this.state.price, 'ether')
                    : this.state.price,
                files
            }),
            additionalInformation: Object.assign(
                AssetModel.additionalInformation,
                {
                    description: this.state.description,
                    copyrightHolder: this.state.copyrightHolder,
                    categories: [this.state.categories]
                }
            )
        }

        try {
            // Create NFT
            const asset = await this.context.sdk.nfts.create(
                newAsset as any,
                account[0],
                this.state.nftAmount,
                this.state.royalty,
                new AssetRewards(account[0].getId(), Number(this.state.price))
            )
            .next((publishingStep: number) => this.setState({ publishingStep }))

            // Mint all NFTs
            this.setState({ publishingStep: 8 })
            await this.context.sdk.nfts.mint(asset.id, this.state.nftAmount, account[0])
            this.setState({ publishingStep: 9 })


            this.setState({
                publishedDid: asset.id,
                isPublished: true
            })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-end ${asset.id}`
            })

            const response = await axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                url: `${serviceUri}/api/v1/file`,
                data: { url: (files[0] as any).url, did: asset.id, compression: (files[0] as any).compression},
            })
        } catch (error) {
            // make readable errors
            Logger.error('error:', error.message)
            this.setState({ publishingError: error.message })

            ReactGA.event({
                category: 'Publish',
                action: `registerAsset-error ${error.message}`
            })
        }

        this.setState({ isPublishing: false })
    }

    public render() {
        return (
            <Market.Consumer>
                {market => (
                    <Route
                        title="Publish"
                        description={`Publish a new data set into the Nevermined ${market.network} Network.`}
                    >
                        <div className={styles.publish}>
                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        Publish
                                    </div>

                                    <div className={styles.subTitle}>
                                        Publish a new artwork into the Nevermined Protocol
                                    </div>

                                    <div className={styles.progress}>
                                        <Progress
                                        steps={steps}
                                        currentStep={this.state.currentStep}
                                        />
                                    </div>

                                </div>

                                <div className={styles.form}>
                                    <Form onSubmit={this.registerAsset}>
                                        {steps.map((step: any, index: number) => (
                                            <Step
                                                key={index}
                                                index={index}
                                                title={step.title}
                                                description={step.description}
                                                currentStep={this.state.currentStep}
                                                fields={step.fields}
                                                inputChange={this.inputChange}
                                                state={this.state}
                                                next={this.next}
                                                prev={this.prev}
                                                totalSteps={steps.length}
                                                tryAgain={this.tryAgain}
                                                toStart={this.toStart}
                                                content={step.content}
                                            />
                                        ))}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Route>
                )}
            </Market.Consumer>
        )
    }
}

export default withTracker(Publish)
