import React, { PureComponent } from 'react'
import isUrl from 'is-url-superb'
import Input from '../../../components/atoms/Form/Input'
import Button from '../../../components/atoms/Button'
import styles from './ItemForm.module.scss'

interface ItemFormProps {
    addFile(url: string): void
    placeholder: string
}

interface ItemFormStates {
    url: string
    hasError: boolean
    noUrl: boolean
    imageTooSmall: boolean
}

export default class ItemForm extends PureComponent<
    ItemFormProps,
    ItemFormStates
> {
    public state: ItemFormStates = {
        url: '',
        hasError: false,
        noUrl: false,
        imageTooSmall: false
    }

    private handleSubmit = (e: Event) => {
        e.preventDefault()

        const { url } = this.state

        // return when required fields are empty, and url value is no url
        // Can't use browser validation cause we are in a form within a form
        if (!url) {
            this.setState({ hasError: true })
            return
        }

        // Filecoin
        if (url.includes('cid://')) {
            this.props.addFile(url)
            return
        }

        if (url && !url.includes('ipfs://') && !isUrl(url)) {
            this.setState({ noUrl: true })
            return
        }

        const image = new Image()
        image.addEventListener('load', async () => {
            let fileType
            // fetching the image twice isn't ideal but can't find a better way right now
            await fetch(url).then(res => res.blob()).then(blob => {
                fileType = blob.type
            })
            console.log(fileType)
            if (image.width < 2048 && fileType !== 'image/gif') {
                this.setState({ imageTooSmall: true })
            } else {
                this.props.addFile(url)
            }
        })
        image.src = url
    }

    private onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ url: e.currentTarget.value })
        this.clearErrors()
    }

    private clearErrors() {
        if (this.state.hasError) this.setState({ hasError: false })
        if (this.state.noUrl) this.setState({ noUrl: false })
    }

    public render() {
        const { url, hasError, noUrl, imageTooSmall } = this.state

        return (
            <div className={styles.itemForm}>
                <Input
                    label="Url"
                    name="url"
                    required
                    type="url"
                    placeholder={this.props.placeholder}
                    value={url}
                    onChange={this.onChangeUrl}
                    help="Supported protocols are http(s)://, ipfs:// and cid://"
                />

                <Button onClick={(e: Event) => this.handleSubmit(e)}>
                    Add File
                </Button>

                {hasError && (
                    <span className={styles.error}>
                        Please fill in all required fields.
                    </span>
                )}
                {noUrl && (
                    <span className={styles.error}>
                        Please enter a valid URL.
                    </span>
                )}
                {imageTooSmall && (
                    <span className={styles.error}>
                        The width of the picture has to be bigger than 2048 pixels.
                    </span>
                )}
            </div>
        )
    }
}
