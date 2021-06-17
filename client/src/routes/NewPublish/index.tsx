import React, { useContext } from 'react'

import withTracker from '../../hoc/withTracker'

import styles from './index.module.scss'
import FullHeightView, {ContentRow} from '../../components/atoms/FullHeightView'
import { CloseIcon } from '../../components/icons'
import Input from '../../components/atoms/MaterialForms/Input'
import Select from '../../components/atoms/MaterialForms/Select'

function NewPublish() {

    return (
        <FullHeightView
            main={(
                <>
                    <ContentRow>
                        <span>PREVIEW</span>
                        <CloseIcon size={14} />
                    </ContentRow>
                    <div className={styles.dragDropContainer}>

                    </div>
                    <div className={styles.preview}>
                        <h2>Your NFT Title</h2>
                        <p>This is where the description of your artwork is displayed</p>
                        <div className={styles.addButtonContainer}>
                            <span className={styles.addButton}>
                                Browse
                            </span>
                            <span className={styles.addButton}>
                                From URL
                            </span>
                            <span className={styles.addButton}>
                                From IPFS
                            </span>
                        </div>
                    </div>
                </>
            )}
            sidebar={(
                <>
                    <div className={styles.formContent}>
                        <h1>Create your own NFT</h1>
                        <h2>Essentials</h2>
                        <p className={styles.subtitle}>
                            Start by giving us details about your artwork, like a title and a description.
                        </p>
                        <Input
                            className={styles.formField}
                            label="Title"
                            placeholder="e.g. The nexty Mona Lisa"
                            helperText="Enter a unique title. You can tell us more in the description below too." />
                        <Select
                            className={styles.formField}
                            label="Art category"
                            helperText="Enter a unique title. You can tell us more in the description below too.">

                            <option value="3D Renders">3D Renders</option>
                            <option value="AR">AR</option>
                            <option value="Digital Collage">Digital Collage</option>
                            <option value="Digital Painting">Digital Painting</option>
                            <option value="Digital Photography">Digital Photography</option>
                            <option value="Fine Art">Fine Art</option>
                            <option value="Generative Art">Generative Art</option>
                            <option value="Illustration">Illustration</option>
                            <option value="Mixed Media">Mixed Media</option>
                            <option value="Sound Design">Sound Design</option>
                            <option value="VR Experience">VR Experience</option>
                        </Select>
                        <Input
                            className={styles.formField}
                            multiline
                            label="Description"
                            placeholder="e.g. This will be the Mona Lisa of the modern generation"
                            helperText="Add a thorough description with as much detail as possible." />
                    </div>
                </>
            )}
        />
    )
}

export default withTracker(NewPublish)
