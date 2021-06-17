import React from 'react'
import cx from 'classnames'
import MSelect, { SelectProps } from '@material-ui/core/Select';
import { TextFieldProps } from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import styles from './SharedStyle.module.scss'

function Select(props: SelectProps & Pick<TextFieldProps, 'helperText'>) {
    const restProps = {...props}
    delete restProps.label
    delete restProps.className

    return (
        <div className={cx(styles.wrapper, props.className)}>
            {props.label && (
                <div className={styles.title}>{props.label}</div>
            )}

            <FormControl className={styles.field}>
                <MSelect {...restProps}>
                    {props.children}
                </MSelect>
                {props.helperText && (
                    <FormHelperText>{props.helperText}</FormHelperText>
                )}
              </FormControl>
        </div>
    )
}

export default Select
