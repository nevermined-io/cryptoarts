import debug from 'debug'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import pkg from '../package.json'
import S3 from 'aws-sdk/clients/s3';


// routes
import UrlCheckRouter from './routes/UrlCheckRouter'
import ReportRouter from './routes/ReportRouter'
import FileStorageRouter from './routes/FileStorageRouter'

// config
import config from './config'

// debug
const log = debug('server:index')

const app = express()

function initializeS3Bucket(): void {
    const s3 = new S3({
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
        endpoint: config.s3.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
    })

    s3.createBucket({ Bucket: "bazaart" }, (err, data) => {
        if (err) {
            console.log('There was a problem connection to S3', err)
        } else {
            console.log(data)
        }
    })
}

function onListening(): void {
    log('Server thread started')
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error
    switch (error.code) {
        case 'EACCES':
            log('Required elevated privileges')
            process.exit(1)
        case 'EADDRINUSE':
            log('Port is already in use')
            process.exit(1)
        default:
            throw error
    }
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    )
    next()
})
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

// routes
app.get('/', (req, res) => {
    res.send(
        `<strong><code>
            Nevermined Marketplace Server v${pkg.version}<br />
            <a href="https://github.com/nevermined-io/marketplace" style="text-decoration:none;color:#190078">github.com/nevermined-io/marketplace</a>
        </code></strong>`
    )
})
app.use('/api/v1/urlcheck', UrlCheckRouter)
app.use('/api/v1/report', ReportRouter)
app.use('/api/v1/file', FileStorageRouter)

/// catch 404
app.use((req, res) => {
    res.status(404).send()
})

// initialize S3 bucket
// This will try to create a bucket if one does not exist
initializeS3Bucket()

// listen
const server = app.listen(config.app.port)
server.on('listening', onListening)
server.on('error', onError)

export default server
