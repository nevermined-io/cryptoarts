import React, { useState, useEffect, ChangeEvent } from 'react'

export const useForm = (callback: () => any, validate: ({}: any) => any) => {

    const [values, setValues] = useState<any>({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback()
        }
    }, [errors])

    const handleSubmit = (event: React.SyntheticEvent) => {
        if (event) event.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)
    }

    function handleChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
    function handleChange (event: ChangeEvent<{ name?: string | undefined; value: unknown }>): void
    function handleChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<{ name?: string | undefined; value: unknown }>): void {
        event.persist()
        setValues((values: any) => ({ ...values, [event.target.name as any]: event.target.value }))
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors,
    }
}
