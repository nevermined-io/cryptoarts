import React, { Component } from 'react'
import { File } from '@nevermined-io/nevermined-sdk-js'
import axios from 'axios'

import { serviceUri } from '../../config'
import styles from './ArtworkImage.module.scss'


export default class ArtworkImage extends Component<{
    did: string
    file: File
}, { url: string }> {
    public constructor(props: any) {
        super(props)
        this.state = { url: '' }
    }

    public async componentDidMount() {
        const { compression } = this.props.file
        const filename = `${this.props.did}.${compression}`
        const response = await axios({
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url: `${serviceUri}/api/v1/file/${filename}`,
        })

        console.log(response.data.url)
        this.setState({ url: response.data.url })
    }

    public render() {
        return (
            <div
                style={{ backgroundImage: `url(${this.state.url})` }}
                className={styles.image}
            ></div>
        )
    }
}
