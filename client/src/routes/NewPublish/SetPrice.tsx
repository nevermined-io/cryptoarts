import styles from './index.module.scss'
import Input from '../../components/atoms/MaterialForms/Input'
import Select from '../../components/atoms/MaterialForms/Select'
import React, { ChangeEvent, useState, Fragment } from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import { ToggleSwitch } from '../../components/atoms/ToggleSwitch'

type Props = {
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void
    values: any
    step: number
}

const editions = [...Array(21).keys()].slice(1)

export const SetPrice = ({ handleChange, step, values }: Props) => {
    const [splitActive, setSplitActive] = useState(true)
    const [splitCount, setSplitCount] = useState(1)
    if (step !== 3) return null
    return <>
        <h2>Set Your Price</h2>
        <p className={styles.subtitle}>
            Enter the number of editions, the price and how
            your want to split revenue below.
        </p>
        <Select
            name="editionCount"
            defaultValue=""
            value={values.editionCount || ''}
            label="Number of editions "
            onChange={handleChange}
        >
            {editions.map(ed => <option key={ed} value={ed}>{ed}</option>)}
        </Select>
        <Input
            className={styles.formField}
            label="Price Tag"
            placeholder="Enter a price in USD"
            value={values.author || ''}
            name="author"
            onChange={handleChange}
            helperText="Platform operation fee 2.5% You will receive 0 NVMD $0.00"
        />
        <Input
            className={styles.formField}
            label="Royalties"
            placeholder="10%"
            value={values.royalties || ''}
            name="royalties"
            onChange={handleChange}
            helperText="Edit this percentage if you want to receive a different cut with every resell."
        />
        <ToggleSwitch active={splitActive} setActive={setSplitActive}/>
        <FormHelperText className={styles.selectHelperText}>Toggle to add beneficiaries</FormHelperText>
        {splitActive &&
        <Fragment>
            {[...Array(splitCount).keys()].map(el =>
                <div className={styles.splitFormFieldWrapper} key={el}>
                    <Input
                        className={styles.formField}
                        label="Wallet"
                        placeholder="0x7024dc438ee59a756d"
                        value={values[`wallet_${el}`] || ''}
                        name={`wallet_${el}`}
                        onChange={handleChange}
                    />
                    <Input
                        className={styles.formField}
                        label="Split"
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        placeholder="%"
                        value={values[`split_${el}`] || ''}
                        name={`split_${el}`}
                        onChange={handleChange}
                    />
                </div>
            )}

            <div className={styles.addSplitButtonWrapper}>
                <div className={styles.addSplitButton} onClick={() => setSplitCount(splitCount + 1)}>
                    + add
                </div>
            </div>
        </Fragment>
        }
    </>
}
