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

type FormValues = EssentialsFormValues & AuthorshipFormValues & SetPriceFormValues

type Errors = {
    split?: boolean
}

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
    const [step, setStep] = useState(3)
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm<FormValues>(login, validate);

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
                            <h2>Drag & Drop</h2>
                            <p>any audio or visual file...</p>
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
