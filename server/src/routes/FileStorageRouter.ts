import { Request, Response, Router } from 'express'
import sharp from 'sharp'
import S3 from 'aws-sdk/clients/s3'
import config from '../config'
import fs from 'fs'
import formidable from 'formidable'
import { execFile } from 'child_process'
import gifsicle from 'gifsicle'
import axios from 'axios'
import { getFileFromFilecoin } from './UrlCheckRouter'

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
            } else {
                const fileContentResponse = await axios.get<Buffer>(url, { responseType: 'arraybuffer' })
                fileContent = fileContentResponse.data
            }
            await s3.upload({
                Bucket: 'bazaart',
                Key: `${did}.${compression}`,
                Body: fileContent
            }).promise()

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

                    const s3Url = s3.getSignedUrl('getObject',
                        {
                            Bucket: 'bazaart',
                            Key: file.name,
                        })
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

export const getS3Url = async (filename: string): Promise<string> => {
    const s3 = new S3({
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
        endpoint: config.s3.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
    })

    return s3.getSignedUrlPromise('getObject',
        {
            Bucket: 'bazaart',
            Key: filename,
        })
}

const resizeImageAndUpload = async (fileContent: Buffer, s3: S3, Key, size: number) => {
    const resized = await sharp(fileContent)
        .resize({ width: size })
        .composite([{ input: `src/assets/nevermined_logo_black_${size}.png`, gravity: 'southeast' }])
        .toBuffer()

    await s3.upload({
        Bucket: 'bazaart',
        Key,
        Body: resized
    }).promise()
}

const resizeGifAndUpload = async (path: string, s3: S3, Key, size: number) => {
    execFile(gifsicle, ['-o', `/tmp/${Key}`, '--resize-fit-width', size.toString(), path])
    await new Promise(r => setTimeout(r, 1000))
    const gif = fs.readFileSync(`/tmp/${Key}`)

    await s3.upload({
        Bucket: 'bazaart',
        Key,
        Body: gif
    }).promise()
}

export const isGif = (fileContent: Buffer): boolean => {
    const uint = new Uint8Array(fileContent)
    const bytes = []
    uint.forEach((byte) => {
        bytes.push(byte.toString(16))
    })
    const fileMagicNumbers = bytes.slice(0, 6).join('')
    return fileMagicNumbers === '474946383761' || fileMagicNumbers === '474946383961'
}

export default fileStorageRoutes.router
