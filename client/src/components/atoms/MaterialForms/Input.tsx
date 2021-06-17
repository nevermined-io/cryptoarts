import React from 'react'
import cx from 'classnames'
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

import styles from './SharedStyle.module.scss'

function Input(props: TextFieldProps) {
    const restProps = {...props}
    delete restProps.label
    delete restProps.className

    return (
        <div className={cx(styles.wrapper, props.className)}>
            {props.label && (
                <div className={styles.title}>{props.label}</div>
            )}
            <TextField
                className={styles.field}
                {...restProps}/>
        </div>
    )
}

export default Input
