export const isGif = (fileContent: Buffer): boolean => {
    const uint = new Uint8Array(fileContent)
    const bytes = []
    uint.forEach((byte) => {
        bytes.push(byte.toString(16))
    })
    const fileMagicNumbers = bytes.slice(0, 6).join('')
    return fileMagicNumbers === '474946383761' || fileMagicNumbers === '474946383961'
}
