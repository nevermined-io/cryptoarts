import React from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@nevermined-io/nevermined-sdk-js'
import styles from './ArtworkDetails.module.scss'
import Web3 from 'web3'
import ArtworkImage from '../../atoms/ArtworkImage'
import FullHeightView, {ContentRow} from '../../atoms/FullHeightView'
import ArtworkFile from './ArtworkFile'
import { CloseIcon, ShareIcon } from '../../icons'

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

export default function ArtworkDetails({ metadata, ddo }: ArtworkDetailsProps) {
    const { main, additionalInformation } = metadata
    const price = main.price && Web3.utils.fromWei(main.price.toString())
    if (!main.files || !additionalInformation || !additionalInformation.categories) {
        return <h2>Missing files or additional information</h2>
    }
    const file = main.files[0]
    const category = additionalInformation.categories[0]

    return (
        <FullHeightView
            main={(
                <div className={styles.wrapper}>
                    <div className={styles.imageWrapper}>
                        <ContentRow>
                            <ShareIcon size={20} />
                            <CloseIcon size={14} />
                        </ContentRow>
                        <div className={styles.imageContainer}>
                            <ArtworkImage
                                did={ddo.id}
                                file={file}
                            />
                        </div>
                        <ContentRow>
                            <span>audio / fullscreen</span>
                        </ContentRow>
                    </div>
                </div>
            )}
            sidebar={(
                <span>{'Sidebar \n\n'.repeat(400)}</span>
            )}
        />
    )
}

// const s = () =>
//     (
//         <div className={styles.main}>
//             <ArtworkImage
//                 did={ddo.id}
//                 file={file}
//             />

//             <div className={styles.information}>
//                 <div className={styles.title}>
//                     {main.name}
//                 </div>

//                 <div className={styles.authorship}>
//                     <span>{category}</span>
//                     <span>
//                         <Moment
//                             date={main.dateCreated}
//                             format="L"
//                             interval={0}
//                         />
//                     </span>
//                     <span>{main.author}</span>
//                     <span>{additionalInformation.copyrightHolder}</span>
//                 </div>

//                 <div className={styles.description}>{additionalInformation.description}</div>
//             </div>

//             <div className={styles.footer}>
//                 <div className={styles.footerContent}>
//                     <span>License</span>{main.license}
//                 </div>
//                 <div className={styles.footerContent}>
//                     <span>Price</span>{price}
//                 </div>
//             </div>

//             <div className={styles.footer}>
//                 <div className={styles.footerContent}>
//                     <span>DID</span>{ddo.id}
//                 </div>
//             </div>

//             <ArtworkFile
//                 ddo={ddo}
//                 file={file}
//                 price={Number(price)}
//             />
//         </div>
//     )
