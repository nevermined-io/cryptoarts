import React, { useState } from 'react'

import withTracker from '../../hoc/withTracker'

import styles from './index.module.scss'
import FullHeightView, { ContentRow } from '../../components/atoms/FullHeightView'
import { CloseIcon } from '../../components/icons'
import Button from '../../components/atoms/Button'
import { useForm } from '../../hooks/UseForm'
import { History } from 'history'
import Input from '../../components/atoms/MaterialForms/Input'
import Select from '../../components/atoms/MaterialForms/Select'
import { InputAdornment } from '@material-ui/core'

function Profile({ history }: { history: History }) {
    const login = () => console.log('login')
    const validate = () => console.log('validate')
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
                        <h1>{values.name || 'Your Profile name'}</h1>
                        <h2> || @yourusername</h2>
                    </div>
                </>
            )}
            sidebar={(
                <>
                    <div className={styles.formContent}>
                        <h1>Create your profile</h1>
                    </div>
                    <Input
                        className={styles.formField}
                        label="Name"
                        placeholder="What you call yourself"
                        value={values.name || ''}
                        name="name"
                        onChange={handleChange}
                    />
                    <Input
                        className={styles.formField}
                        label="Username"
                        placeholder="What others call you"
                        value={values.username || ''}
                        name="username"
                        onChange={handleChange}
                        helperText="Enter a unique title. You can tell us more in the description below too."
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <div className={styles.adornment}>
                                    @
                                </div>
                            </InputAdornment>
                        }}
                    />
                    <Input
                        className={styles.formField}
                        label="Email"
                        placeholder="Your email address"
                        value={values.email || ''}
                        name="email"
                        onChange={handleChange}
                        helperText="If you want to get email updates. Not shown on profile."
                    />
                    <Select
                        name="role"
                        defaultValue="Artist"
                        style={{ color: values.role ? 'black' : '#9D9FA0', margin: '10px 0 48px' }}
                        value={values.role}
                        label="What do you do"
                        onChange={handleChange}
                    >
                        <option value="Artist">Artist</option>
                        <option value="Collector">Collector</option>
                    </Select>
                    <Input
                        className={styles.formField}
                        multiline
                        label="Bio description"
                        value={values.description || ''}
                        name="description"
                        onChange={handleChange}
                        placeholder="e.g. Went to the Mars School of Arts and Sciences and created the Mona Lisa of the modern generation"
                    />
                    <Button
                        fullWidth
                        secondary
                    >complete profile</Button>
                </>
            )}
        />
    )
}

export default withTracker(Profile)
