import { Request, Response, Router } from 'express'
import S3 from 'aws-sdk/clients/s3'
import config from '../config'
import fs from 'fs'
import formidable from 'formidable'
import axios from 'axios'
import { getFileFromFilecoin } from './UrlCheckRouter'
import { isGif } from '../helpers/isGif'
import { resizeGifAndUpload, resizeImageAndUpload } from '../helpers/resizeAndUpload'

export class FileStorageRouter {
    public router: Router

    /**
     * Initialize the FileStorageRouter
     */
    public constructor() {
        this.router = Router()
    }

    public async saveFile(req: Request, res: Response) {
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

        try {
            // Filecoin
            let fileContent: Buffer
            if (url.includes('cid://')) {
                fileContent = Buffer.from(await getFileFromFilecoin(url))
            }
            else if (url.includes('s3://')) {
                const filename = url.split('/').pop()
                try {
                    const fileContentResponse = await s3.getObject({
                        Bucket: 'bazaart',
                        Key: filename
                    }).promise()
                    fileContent = fileContentResponse.Body as Buffer
                } catch (err) {
                    console.log(err)
                }

            } else {
                const fileContentResponse = await axios.get<Buffer>(url, { responseType: 'arraybuffer' })
                fileContent = fileContentResponse.data
            }
            try {
                await s3.upload({
                    Bucket: 'bazaart',
                    Key: `${did}.${compression}`,
                    Body: fileContent
                }).promise()
            } catch(err) {
                console.log(err)
            }

            if (isGif(fileContent)) {
                const filePath = `/tmp/${new Date().getTime()}.gif`
                fs.writeFileSync(filePath, fileContent)
                await new Promise(r => setTimeout(r, 500))
                await resizeGifAndUpload(filePath, s3, `${did}_300.${compression}`, 300)
                await resizeGifAndUpload(filePath, s3, `${did}_512.${compression}`, 512)
            } else {
                await resizeImageAndUpload(fileContent, s3, `${did}_300.${compression}`, 300)
                await resizeImageAndUpload(fileContent, s3, `${did}_512.${compression}`, 512)
                await resizeImageAndUpload(fileContent, s3, `${did}_2048.${compression}`, 2048)
            }
        } catch (error) {
            console.log(error)
        }

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
            if (err) {
                return res.send({ status: 'error', message: err.message })
            } else {
                const file = files.file

                if (!file) {
                    return res.send({ status: 'error', message: 'missing file' })
                }

                const fileContent = fs.readFileSync(file.path)
                console.log(file.path)

                const s3 = new S3({
                    accessKeyId: config.s3.accessKeyId,
                    secretAccessKey: config.s3.secretAccessKey,
                    endpoint: config.s3.endpoint,
                    s3ForcePathStyle: true,
                    signatureVersion: 'v4'
                })

                try {
                    await s3.upload({
                        Bucket: 'bazaart',
                        Key: file.name,
                        Body: fileContent
                    }).promise()

                    const s3Url = `s3://bazaart/${file.name}`
                    return res.send({ status: 'success', url: s3Url })

                } catch (error) {
                    console.log(error)
                    // shouldn't we throw here?
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
