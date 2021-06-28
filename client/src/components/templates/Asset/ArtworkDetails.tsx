import React, { useState } from 'react'
import Moment from 'react-moment'
import { DDO, MetaData, File } from '@nevermined-io/nevermined-sdk-js'
import styles from './ArtworkDetails.module.scss'
import Web3 from 'web3'
import ArtworkImage from '../../atoms/ArtworkImage'
import Button from '../../atoms/Button'
import FullHeightView, {ContentRow} from '../../atoms/FullHeightView'
import ArtworkFile from './ArtworkFile'
import { CloseIcon, ShareIcon, FullscreenIcon } from '../../icons'

interface ArtworkDetailsProps {
    metadata: MetaData
    ddo: DDO
    nftDetails: any
}

export default function ArtworkDetails({ metadata, ddo, nftDetails }: ArtworkDetailsProps) {
    const [fullscreen, setFullscreen] = useState(false)

    const { main, additionalInformation } = metadata
    const price = main.price && Web3.utils.fromWei(main.price.toString())
    if (!main.files || !additionalInformation || !additionalInformation.categories) {
        return <h2>Missing files or additional information</h2>
    }
    const file = main.files[0]
    const category = additionalInformation.categories[0]

    return (
        <FullHeightView
            fullscreen={fullscreen}
            main={(
                <>
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
                        <span />
                        <span onClick={() => setFullscreen(!fullscreen)} className={styles.clickable}>
                            <FullscreenIcon size={20} />
                        </span>
                    </ContentRow>
                </>
            )}
            sidebar={(
                <>
                    <h1>{main.name}</h1>
                    <div className={styles.cols}>
                        <div>
                            <h4 className={styles.upper}>Creator:</h4>
                            <div>{additionalInformation.copyrightHolder}</div>
                        </div>
                        <div>
                            <h4 className={styles.upper}>Owner:</h4>
                            <div>@someartist</div>
                        </div>
                        <div>
                            <h4 className={styles.upper}>Created:</h4>
                            <div>
                                <Moment
                                    date={main.dateCreated}
                                    format="LL"
                                    interval={0}/>
                            </div>
                        </div>
                    </div>

                    <p>
                        {additionalInformation.description}
                    </p>

                    <div className={styles.spacer} />

                    <h2>About the creator</h2>
                    <h3>@someartist</h3>

                    <p>
                        Deserunt esse laboris ut voluptate cupidatat cillum do laborum
                        aliquip et dolore aute do minim sunt in eiusmod reprehenderit
                        laborum ullamco ut consectetur enim do ut voluptate ullamco eiusmod occaecat.
                    </p>

                    <Button secondary fullWidth>go to profile</Button>

                    <div className={styles.spacer} />

                    <h2>Additional information</h2>

                    <div className={styles.infoRow}>
                        <strong>Category:</strong>
                        <span>{category}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>License:</strong>
                        <span>{main.license}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Author:</strong>
                        <span>{main.author}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Copyright holder:</strong>
                        <span>{additionalInformation.copyrightHolder}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>DID:</strong>
                        <span>{ddo.id}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <strong>Royalties:</strong>
                        <span>{nftDetails.royalties} %</span>
                    </div>
                </>
            )}
            subsidebar={(
                <>
                    <div className={styles.priceTitleWrapper}>
                        <strong>Current price</strong>
                        <span>Edition of {nftDetails.nftSupply}</span>
                    </div>
                    <div className={styles.priceWrapper}>
                        <strong>{price} NVMD</strong>
                        {/*<span>$1200USD</span>*/}
                    </div>
                    <Button primary fullWidth>Buy now</Button>
{
//             <ArtworkFile
//                 ddo={ddo}
//                 file={file}
//                 price={Number(price)}
//             />
}
                    <div className={styles.buttonSpacer} />
                    <Button fullWidth>Download High-Res File</Button>
                </>
            )}
        />
    )
}
