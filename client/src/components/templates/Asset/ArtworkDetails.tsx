import React from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@nevermined-io/nevermined-sdk-js'
import shortid from 'shortid'
import Markdown from '../../atoms/Markdown'
import CategoryLink from '../../atoms/CategoryLink'
import styles from './ArtworkDetails.module.scss'
import AssetFilesDetails from './AssetFilesDetails'
import Report from './Report'
import Web3 from 'web3'
import ArtworkImage from '../../atoms/ArtworkImage'

interface ArtworkDetailsProps {
    metadata: MetaData
    ddo: DDO
}

export function datafilesLine(files: File[]) {
    if (files.length === 1) {
        return <span>{files.length} data file</span>
    }
    return <span>{files.length} data files</span>
}

const MetaFixedItem = ({ name, value }: { name: string; value: string }) => (
    <li>
        <span className={styles.metaLabel}>
            <strong>{name}</strong>
        </span>
        <span className={styles.metaValue}>{value}</span>
    </li>
)

export default function ArtworkDetails({ metadata, ddo }: ArtworkDetailsProps) {
    const { main, additionalInformation } = metadata
    const price = main.price && Web3.utils.fromWei(main.price.toString())
    const file = main.files[0]
    const category = additionalInformation.categories[0]

    const metaFixed = [
        {
            name: 'Author',
            value: main.author,
            show: true
        },
        {
            name: 'License',
            value: main.license,
            show: true
        },
        {
            name: 'DID',
            value: ddo.id,
            show: true
        },
        {
            name: 'Price',
            value: `${price} NEVERMINED`,
            show: price !== '0'
        }
    ]

    return (
        <div className={styles.main}>
            <ArtworkImage
                did={ddo.id}
                file={file}
            />

            <div className={styles.information}>
                <div className={styles.title}>
                    {main.name}
                </div>

                <div className={styles.authorship}>
                    <span>{category}</span>
                    <span>
                        <Moment
                            date={main.dateCreated}
                            format="L"
                            interval={0}
                        />
                    </span>
                    <span>{main.author}</span>
                    <span>{additionalInformation.copyrightHolder}</span>
                </div>

                <div className={styles.description}>{additionalInformation.description}</div>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerTitle}>License</div>
                <div>{main.license}</div>
                <div className={styles.footerTitle}>Price</div>
                <div>{price}</div>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerTitle}>DID</div>
                <div>{ddo.id}</div>
            </div>
        </div>
    )
}
