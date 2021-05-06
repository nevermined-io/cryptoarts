import axios from 'axios'
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { serviceUri } from '../../../config'

const acceptedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/tiff',
    'image/gif',
]

interface BrowseFormProps {
    addFile(url: string): void
}

interface BrowseFormState {
    imageTooSmall: boolean
}

export default class BrowseForm extends Component<
    BrowseFormProps,
    BrowseFormState
> {
    public state = {
        imageTooSmall: false
    }
    private onDrop = async (files: File[]) => {
        this.setState({ imageTooSmall: false })
        if (files[0].type !== 'image/gif') {
            const image = new Image()
            image.addEventListener('load', async () => {
                if (image.width < 2048) {
                    this.setState({ imageTooSmall: true })
                } else {
                    await this.upload(files[0])
                }
            })
            image.src = URL.createObjectURL(files[0])
        } else {
            await this.upload(files[0])
        }
    }

    private async upload(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${serviceUri}/api/v1/file/upload`,
            data: formData,
        })
        console.log(response)
        this.props.addFile(response.data.url)
    }

    public render() {
        return (
            <Dropzone onDrop={this.onDrop} multiple={false} accept={acceptedTypes}>
                {({getRootProps, getInputProps}) => (
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop a file here, or click to select one</p>
                    </div>
                    <aside>
                    <h4>Files</h4>
                    </aside>
                    {this.state.imageTooSmall && <h5>The width of the picture has to be bigger than 2048 pixels.</h5>}
                </section>
                )}
            </Dropzone>
        )
    }
}
