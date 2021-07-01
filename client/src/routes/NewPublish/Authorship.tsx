import styles from './index.module.scss'
import Input from '../../components/atoms/MaterialForms/Input'
import Select from '../../components/atoms/MaterialForms/Select'
import React, { ChangeEvent } from 'react'
import { MenuItem } from '@material-ui/core'
import FormHelperText from '@material-ui/core/FormHelperText'

type Props = {
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void
    values: any
    step: number
}

const licenseOptions = [
    "Public Domain",
    "PDDL: Public Domain Dedication and License",
    "ODC-By: Attribution License",
    "ODC-ODbL: Open Database License",
    "CDLA-Sharing: Community Data License Agreement",
    "CDLA-Permissive: Community Data License Agreement",
    "CC0: Public Domain Dedication",
    "CC BY: Attribution 4.0 International",
    "CC BY-SA: Attribution-ShareAlike 4.0 International",
    "CC BY-ND: Attribution-NoDerivatives 4.0 International",
    "CC BY-NC: Attribution-NonCommercial 4.0 International",
    "CC BY-NC-SA: Attribution-NonCommercial-ShareAlike 4.0 International",
    "CC BY-NC-ND: Attribution-NonCommercial-NoDerivatives 4.0 International"
]

export const Authorship = ({ handleChange, step, values }: Props) => {
    if (step !== 2) return null

    return <>
        <h2>Authorship</h2>
        <p className={styles.subtitle}>
            Give proper attribution to your artwork.
        </p>
        <Input
            className={styles.formField}
            label="Author"
            placeholder="Your name, or artist pseudonym"
            value={values.author || ''}
            name="author"
            onChange={handleChange}
        />
        <Input
            className={styles.formField}
            label="Copyright Holder"
            placeholder="Myself"
            value={values.coprHolder || ''}
            name="coprHolder"
            onChange={handleChange}
        />
        <Select
            name="license"
            defaultValue="none"
            style={{ color: values.license && values.license !== 'none' ? 'black' : '#9D9FA0', margin: '10px 0 48px' }}
            value={values.license}
            label="License"
            onChange={handleChange}
        >
            <option value="none" disabled>
                All Rights Reserved
            </option>
            {licenseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </Select>
    </>
}
