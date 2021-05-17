import axios from 'axios'
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { gatewayUri } from '../../../config'

const acceptedTypes = [
    'image/*',
    'video/*'
]

interface BrowseFormProps {
    addFile(url: string): void
}

export default class BrowseForm extends Component<
    BrowseFormProps,
    {}
> {
    private onDrop = async (files: File[]) => {
        const file = files[0]

        // upload to Filecoin
        const formData = new FormData()
        formData.append('file', file)

        const responseFilecoin = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${gatewayUri}/api/v1/gateway/services/upload/filecoin`,
            data: formData,
        })
        this.props.addFile(responseFilecoin.data.url)
    }

    public render() {
        return (
            <Dropzone onDrop={this.onDrop} multiple={false} accept={acceptedTypes}>
                {({getRootProps, getInputProps}) => (
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                    </div>
                    <aside>
                    <h4>Files</h4>
                    </aside>
                </section>
                )}
            </Dropzone>
        )
    }
}