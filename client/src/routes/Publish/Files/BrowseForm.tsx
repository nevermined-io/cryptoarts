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

export default class BrowseForm extends Component<
    BrowseFormProps,
    {}
> {

    private onDrop = async (files: File[]) => {
        const formData = new FormData();
        formData.append('file', files[0])
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
                </section>
                )}
            </Dropzone>
        )
    }
}
