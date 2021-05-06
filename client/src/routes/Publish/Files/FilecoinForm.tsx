import axios from 'axios'
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { serviceUri, gatewayUri } from '../../../config'
import { User } from '../../../context'

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
        const formData = new FormData();
        formData.append('file', file)

        let response = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${gatewayUri}/api/v1/gateway/services/upload/filecoin`,
            data: formData,
        })
        console.log(response)
        this.props.addFile(response.data.url)


        // Upload to S3 for with the downscaling and watermarking

        response = await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${serviceUri}/api/v1/file/upload`,
            data: formData,
        })
        console.log(response)
    }

    public render() {
        return (
            <Dropzone onDrop={this.onDrop} multiple={false} accept={acceptedTypes}>
                {({getRootProps, getInputProps}) => (
                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
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