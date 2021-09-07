import styles from './index.module.scss'
import Input from '../../components/atoms/MaterialForms/Input'
import Select from '../../components/atoms/MaterialForms/Select'
import React, { ChangeEvent } from 'react'
import Button from '../../components/atoms/Button'

export type EssentialsFormValues = {
    title?: string
    category?: string
    description?: string
    filePublish?: any
}

type Props = {
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void
    setStep: (newStep: number) => void
    step: number
    values: EssentialsFormValues
}

export const Essentials = ({ handleChange, setStep, step, values }: Props) => {
    if (step !== 1) return null
    return <>
        <h2>Essentials</h2>
        <p className={styles.subtitle}>
            Start by giving us details about your artwork, like a title and a description.
        </p>
        <Input
            className={styles.formField}
            label="Title"
            placeholder="e.g. The nexty Mona Lisa"
            value={values.title || ''}
            name="title"
            onChange={handleChange}
            helperText="Enter a unique title. You can tell us more in the description below too."/>
        <Select
            className={styles.formField}
            name="category"
            defaultValue=""
            value={values.category || ''}
            label="Art category"
            onChange={handleChange}
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
            value={values.description || ''}
            name="description"
            onChange={handleChange}
            placeholder="e.g. This will be the Mona Lisa of the modern generation"
            helperText="Add a thorough description with as much detail as possible."/>
        <Button
            disabled={!values.title || !values.category || !values.description}
            fullWidth
            onClick={() => setStep(2)}
            secondary
        >next</Button>
    </>
}
