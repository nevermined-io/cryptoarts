import React, { useState } from 'react'

import withTracker from '../../hoc/withTracker'

import styles from './index.module.scss'
import FullHeightView, { ContentRow } from '../../components/atoms/FullHeightView'
import { CloseIcon } from '../../components/icons'
import Steps, { Step } from '../../components/atoms/Steps'
import { useForm } from '../../hooks/UseForm'
import { Essentials, EssentialsFormValues } from './Essentials'
import { Authorship, AuthorshipFormValues } from './Authorship'
import { SetPrice, SetPriceFormValues } from './SetPrice'
import { History } from 'history'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { serviceUri } from '../../config'
import cleanupContentType from '../../utils/cleanupContentType'
import UserProvider from '../../context/UserProvider'
import { useContext } from 'react'
import { User } from '../../context'

type FormValues = EssentialsFormValues & AuthorshipFormValues & SetPriceFormValues

type Errors = {
    split?: boolean
}

const acceptedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/tiff',
    'image/gif',
]



function NewPublish({ history }: { history: History }) {
    const login = () => console.log('login')
    const validate = () => {
        const validationErrors: Errors = {}
        const splitSum = Object.keys(values)
            .filter(prop => prop.includes('split'))
            .reduce((acc, curr) => acc + Number(values[curr]), 0)
        if (splitSum !== 100) {
            validationErrors.split = true
        } else {
            delete validationErrors.split
        }
        return validationErrors
    }

    const onDrop =  async (files: File[]) => {
        const formData = new FormData()
        const [file] = files
        formData.append('file', file)
        const response = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${serviceUri}/api/v1/file/upload`,
            data: formData,
        })

        const filePublish = {
            found: true,
            contentLenght: file.size,
            contentType: file.type,
            compression: cleanupContentType(file.type),
            url: response.data.url,
        }
        values.filePublish = filePublish
    }

    const [step, setStep] = useState(1)
    const context = useContext(User)
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm<FormValues>(login, validate, context);

    return (
        <FullHeightView
            main={(
                <>
                    <ContentRow>
                        <span>PREVIEW</span>
                        <CloseIcon size={14} onClick={() => history.push('/')}/>
                    </ContentRow>
                    <Steps className={styles.steps} step={step}>
                        <Step>Essentials</Step>
                        <Step>Authorship</Step>
                        <Step>Price</Step>
                    </Steps>
                    <div className={styles.dragDropContainer}>
                        <div className={styles.dragDropDashedLine}>

                            <Dropzone onDrop={onDrop} multiple={false} accept={acceptedTypes}>
                                {({getRootProps, getInputProps}) => (
                                <section className="container">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <h2>Drag & Drop</h2>
                                    <p>any image file...</p>
                                    </div>
                                </section>
                                )}
                            </Dropzone>
                        </div>

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
                        <Essentials handleChange={handleChange} setStep={setStep} step={step} values={values}/>
                        <Authorship handleChange={handleChange} setStep={setStep} step={step} values={values}/>
                        <SetPrice errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} step={step} values={values}/>
                    </div>
                </>
            )}
        />
    )
}

export default withTracker(NewPublish)
