import axios from 'axios'
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { FilePublish } from '.'
import { serviceUri, gatewayUri } from '../../../config'
import { User } from '../../../context'
import cleanupContentType from '../../../utils/cleanupContentType'

const acceptedTypes = [
    'image/*',
    'video/*'
]

interface BrowseFormProps {
    addFile(url: string, filePublish: FilePublish): void
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
        console.log(responseFilecoin)




        // Upload to S3
        const responseS3= await axios({
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            url: `${serviceUri}/api/v1/file/upload`,
            data: formData,
        })
        console.log(responseS3)

        const filePublish: FilePublish = {
            url: responseFilecoin.data.url,
            tmpUrl: responseS3.data.url,
            contentType: file.type,
            compression: cleanupContentType(file.type),
            contentLength: file.size.toString(),
            found: true
        }
        this.props.addFile(responseFilecoin.data.url, filePublish)

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