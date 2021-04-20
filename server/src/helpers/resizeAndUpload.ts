import S3 from 'aws-sdk/clients/s3'
import { execFile } from 'child_process'
import fs from 'fs'
import gifsicle from 'gifsicle'
import sharp from 'sharp'

export const resizeGifAndUpload = async (path: string, s3: S3, Key, size: number) => {
    execFile(gifsicle, ['-o', `/tmp/${Key}`, '--resize-fit-width', size.toString(), path])
    await new Promise(r => setTimeout(r, 1000))
    const gif = fs.readFileSync(`/tmp/${Key}`)

    await s3.upload({
        Bucket: 'bazaart',
        Key,
        Body: gif
    }).promise()
}

export const resizeImageAndUpload = async (fileContent: Buffer, s3: S3, Key, size: number) => {
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
