import { Account } from '@nevermined-io/nevermined-sdk-js'
import AssetRewards from '@nevermined-io/nevermined-sdk-js/dist/node/models/AssetRewards'
import axios from 'axios'
import React, { useState, useEffect, ChangeEvent } from 'react'
import Web3 from 'web3'
import { gatewayAddress, marketplaceFeePercentage, serviceUri } from '../config'
import AssetModel from '../models/AssetModel'


export const useForm = <V extends unknown>(callback: () => any, validate: (values: V) => void, context: any): {
    handleChange: any
    handleSubmit: any
    values: V
    errors: any
} => {

    const [values, setValues] = useState<any>({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { sdk } = context

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        }
    }, [errors])

    const splitAssetRewards = (seller: Account) =>  {
        const priceDecimals = Number(Web3.utils.toWei(values.priceTag, 'ether'))
        const sellerFeePercentage = 100 - marketplaceFeePercentage

        const sellerAmount = Math.floor((priceDecimals * sellerFeePercentage) / 100) + (priceDecimals * sellerFeePercentage) % 100
        const marketAmount = Math.floor((priceDecimals * marketplaceFeePercentage) / 100)

        return new AssetRewards(
            new Map([
                [seller.getId(), sellerAmount],
                [gatewayAddress, marketAmount]
            ])
        )
    }

    const handleSubmit = async (event: React.SyntheticEvent) => {
        if (event) event.preventDefault()
        setErrors(validate(values) as any)
        setIsSubmitting(true)

        const account = await sdk.accounts.list()

        const {tmpUrl, found, ...file} = values.filePublish


        const newAsset = {
            main: Object.assign(AssetModel.main, {
                type: 'dataset',
                name: values.title,
                datePublished: new Date().toISOString().split('.')[0] + 'Z',
                dateCreated:
                    new Date()
                        .toISOString()
                        .split('.')[0] + 'Z', // remove milliseconds
                author: values.author,
                license: values.license,
                price: Web3.utils.toWei(values.priceTag, 'ether'),
                files: [file]
            }),
            additionalInformation: Object.assign(
                AssetModel.additionalInformation,
                {
                    description: values.description,
                    copyrightHolder: values.coprHolder,
                    categories: [values.category]
                }
            )
        }

        try {
            // Create NFT
            const asset = await sdk.nfts.create(
                newAsset as any,
                account[0],
                values.editionCount,
                values.royalties,
                splitAssetRewards(account[0])
            )
            // .next((publishingStep: number) => setState({ publishingStep }))

            // Mint all NFTs
            // this.setState({ publishingStep: 8 })
            await sdk.nfts.mint(asset.id, values.editionCount, account[0])
            // this.setState({ publishingStep: 9 })


            // this.setState({
            //     publishedDid: asset.id,
            //     isPublished: true
            // })

            // ReactGA.event({
            //     category: 'Publish',
            //     action: `registerAsset-end ${asset.id}`
            // })

            await axios({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                url: `${serviceUri}/api/v1/file`,
                data: { url: values.filePublish.url, did: asset.id, compression: values.filePublish.compression},
            })
        } catch (error) {
            console.log(error)
            // make readable errors
            // Logger.error('error:', error.message)
            // this.setState({ publishingError: error.message })

            // ReactGA.event({
            //     category: 'Publish',
            //     action: `registerAsset-error ${error.message}`
            // })
        }

        // this.setState({ isPublishing: false })
    }

    function handleChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    function handleChange (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void
    function handleChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string | undefined; value: unknown }>): void {
        event.persist()
        setValues((values: any) => ({ ...values, [event.target.name as any]: event.target.value }))
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
}
