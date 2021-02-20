import 'dotenv/config'

const config = {
    app: { port: 4000 },
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    ipfsGatewayUri: process.env.IPFS_GATEWAY_URI || 'https://ipfs.infura.io',
    s3: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        endpoint: process.env.S3_ENDPOINT
    }
}

export default config
