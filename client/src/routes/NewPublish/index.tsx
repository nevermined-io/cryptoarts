import React, { useState } from 'react'

import withTracker from '../../hoc/withTracker'

import styles from './index.module.scss'
import FullHeightView, { ContentRow } from '../../components/atoms/FullHeightView'
import { CloseIcon } from '../../components/icons'
import Button from '../../components/atoms/Button'
import Steps, { Step } from '../../components/atoms/Steps'
import { useForm } from '../../hooks/UseForm'
import { Essentials } from './Essentials'
import { Authorship } from './Authorship'
import { SetPrice } from './SetPrice'
import { History } from 'history'

function NewPublish({ history }: { history: History }) {
    const login = () => console.log('login')
    const validate = () => console.log('validate')
    const [step, setStep] = useState(1)
    const {
        handleChange,
        handleSubmit,
        values,
        errors,
    } = useForm(login, validate);

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
                        <Essentials handleChange={handleChange} step={step} values={values}/>
                        <Authorship handleChange={handleChange} step={step} values={values}/>
                        <SetPrice handleChange={handleChange} step={step} values={values}/>
                    </div>
                    <Button
                        fullWidth
                        onClick={() => setStep(step >=2 ? 3 : step + 1)}
                        secondary
                    >next</Button>
                </>
            )}
        />
    )
}

export default withTracker(NewPublish)
