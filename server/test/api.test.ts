import request from 'supertest'
import server from '../src/server'
import S3 from 'aws-sdk/clients/s3'
import config from '../src/config'
import fs from 'fs'

afterAll(done => {
    server.close(done)
})

describe('GET /', () => {
    it('responds with success', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })
})

describe('POST /api/v1/urlcheck', () => {
    it('responds with json on http://', async () => {
        const response = await request(server)
            .post('/api/v1/urlcheck')
            .send({ url: 'https://oceanprotocol.com/tech-whitepaper.pdf' })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with json on ipfs://', async () => {
        const response = await request(server)
            .post('/api/v1/urlcheck')
            .send({
                url:
                    'ipfs://QmX5LRpEVocfks9FNDnRoK2imf2fy9mPpP4wfgaDVXWfYD/video.mp4'
            })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with error message when url is missing', async () => {
        const response = await request(server).post('/api/v1/urlcheck')
        const text = await JSON.parse(response.text)
        expect(text.message).toBe('missing url')
    })
})

describe('POST /api/v1/report', () => {
    const msg = {
        to: 'test@example.com',
        from: 'test@example.com',
        subject: 'My Subject',
        text: 'Text',
        html: '<strong>HTML</strong>'
    }

    it('responds with json', async () => {
        const response = await request(server)
            .post('/api/v1/report')
            .send({ msg })
        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
    })

    it('responds with error', async () => {
        const response = await request(server)
            .post('/api/v1/report')
            .send({ msg: 'Hello World' })
        expect(response.text).toBe(
            "undefined - Cannot create property 'isMultiple' on string 'Hello World'"
        )
    })

    it('responds with error message when message is missing', async () => {
        const response = await request(server).post('/api/v1/report')
        const text = await JSON.parse(response.text)
        expect(text.message).toBe('missing message')
    })
})

describe('POST /api/v1/file/', () => {
    const s3 = new S3({
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
        endpoint: config.s3.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
    })

    beforeEach(async () => {
        const objectsToDelete = await s3.listObjects({ Bucket: 'bazaart' }).promise()
        await s3.deleteObjects({ Bucket: 'bazaart', Delete: { Objects: objectsToDelete.Contents.map(obj => ({ Key: obj.Key })) } }).promise()
    })

    it('uploads 4 files to the bucket', async () => {
        const Key = 'goats.png'
        const fileContent = fs.readFileSync('./test/assets/goats.png')
        await s3.putObject({ Bucket: 'bazaart', Key, Body: fileContent }).promise()
        const url = s3.getSignedUrl('getObject', { Bucket: 'bazaart', Key })
        const objectsBeforeUpload = await s3.listObjects({ Bucket: 'bazaart' }).promise()
        expect(objectsBeforeUpload.Contents.length).toBe(1)

        await request(server)
            .post('/api/v1/file/')
            .send({ url, did: new Date().getTime(), compression: 'png' })

        const objectsAfterUpload = await s3.listObjects({ Bucket: 'bazaart' }).promise()
        expect(objectsAfterUpload.Contents.length - objectsBeforeUpload.Contents.length).toBe(4)
    })

    it('correctly resizes and adds a watermark to pictures', async () => {
        const Key = 'goats.png'
        const did = new Date().getTime()
        const fileContent = fs.readFileSync('./test/assets/goats.png')
        await s3.putObject({ Bucket: 'bazaart', Key, Body: fileContent }).promise()
        const url = s3.getSignedUrl('getObject', { Bucket: 'bazaart', Key })

        await request(server)
            .post('/api/v1/file/')
            .send({ url, did, compression: 'png' })

        const goats512OnS3 = await s3.getObject({ Bucket: 'bazaart', Key: `${did}_512.png` }).promise()
        const goats512Local = fs.readFileSync('./test/assets/goats_512.png')
        expect(goats512OnS3.Body).toEqual(goats512Local)
    })
})

describe('Errors', () => {
    it('responds with 404 on unknown path', async () => {
        const response = await request(server).post('/whatever')
        expect(response.status).toBe(404)
    })
})
