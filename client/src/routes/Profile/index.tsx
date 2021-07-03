import React, { useState } from 'react'

import withTracker from '../../hoc/withTracker'

import styles from './index.module.scss'
import FullHeightView, { ContentRow } from '../../components/atoms/FullHeightView'
import { CloseIcon } from '../../components/icons'
import Button from '../../components/atoms/Button'
import Steps, { Step } from '../../components/atoms/Steps'
import { useForm } from '../../hooks/UseForm'
import { History } from 'history'

function Profile({ history }: { history: History }) {
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
                    <div className={styles.dragDropContainer}>
                        <div className={styles.dragDropDashedLine}>
                            <h2>Drag & Drop your profile image</h2>
                            <p>we take JPG, PNG and GIFs?...</p>
                        </div>
                    </div>
                    <div className={styles.preview}>
                        <h1>Your Profile name</h1>
                        <h2>@yourusername</h2>
                    </div>
                </>
            )}
            sidebar={(
                <>
                    <div className={styles.formContent}>
                        <h1>Create your profile</h1>
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

export default withTracker(Profile)
