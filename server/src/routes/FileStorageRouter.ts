import { Router, Request, Response } from 'express'
import request from 'request'
import S3 from 'aws-sdk/clients/s3'
import config from '../config'
import fs from 'fs'
import formidable from 'formidable'

export class FileStorageRouter {
    public router: Router

    /**
     * Initialize the FileStorageRouter
     */
    public constructor() {
        this.router = Router()
    }

    public saveFile(req: Request, res: Response) {
        const { url, did, compression } = req.body
        console.log("request to filestorage")

        if (!url) {
            return res.send({ status: 'error', message: 'missing url' })
        }

        if (!did) {
            return res.send({ status: 'error', message: 'missing did' })
        }

        if (!compression) {
            return res.send({ status: 'error', message: 'missing compression' })
        }

        const s3 = new S3({
            accessKeyId: config.s3.accessKeyId,
            secretAccessKey: config.s3.secretAccessKey,
            endpoint: config.s3.endpoint,
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        })

        s3.getSignedUrl('putObject',
        {
            Bucket: 'bazaart',
            Key: `${did}.${compression}`,
        },
        (error, s3Url) => {
            console.log(error)
            request.get(url).pipe(request.put(s3Url))
        })
        return res.send({ status: 'success' })
    }

    public getUrl(req: Request, res: Response) {
        const { filename } = req.params

        if (!filename) {
            return res.send({ status: 'error', message: 'missing filename' })
        }

        const s3 = new S3({
            accessKeyId: config.s3.accessKeyId,
            secretAccessKey: config.s3.secretAccessKey,
            endpoint: config.s3.endpoint,
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        })

        s3.getSignedUrl('getObject',
        {
            Bucket: 'bazaart',
            Key: filename,
        },
        (error, s3Url) => {
            console.log(error)
            return res.send({ status: 'success', url: s3Url })
        })
    }

    public upload(req: Request, res: Response) {
        const form = formidable()
        form.parse(req, async (err, fields, files) => {
            if(err) {
                return res.send({ status: 'error', message: err.message })
            } else {
                const file = files.file

                if (!file) {
                    return res.send({ status: 'error', message: 'missing file' })
                }

                const fileContent = fs.readFileSync(file.path)

                const s3 = new S3({
                    accessKeyId: config.s3.accessKeyId,
                    secretAccessKey: config.s3.secretAccessKey,
                    endpoint: config.s3.endpoint,
                    s3ForcePathStyle: true,
                    signatureVersion: 'v4'
                })

                try {
                    const uploadResponse = await s3.upload({
                        Bucket: 'bazaart',
                        Key: file.name,
                        Body: fileContent
                    }).promise()
                    console.log(uploadResponse)

                    const s3Url = s3.getSignedUrl('getObject',
                        {
                            Bucket: 'bazaart',
                            Key: file.name,
                        })
                    return res.send({ status: 'success', url: s3Url })

                } catch (error) {
                    console.log(error)
                    return res.send({ status: 'error', message: error.message })
                }
            }
        })
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    public init() {
        this.router.post('/', this.saveFile)
        this.router.post('/upload', this.upload)
        this.router.get('/:filename', this.getUrl)
    }
}

// Create the MeRouter, and export its configured Express.Router
const fileStorageRoutes = new FileStorageRouter()
fileStorageRoutes.init()

export default fileStorageRoutes.router
