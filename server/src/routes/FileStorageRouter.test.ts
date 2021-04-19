import fs from 'fs'
import { isGif } from './FileStorageRouter'

describe('isGif', () => {
   it('returns true if the supplied file is a gif', () => {
       const gifFile = fs.readFileSync('./test/assets/rockspit.gif')

       expect(isGif(gifFile)).toBe(true)
   })

    it('returns false if the supplied file is not a gif', () => {
       const gifFile = fs.readFileSync('./test/assets/goats.png')

       expect(isGif(gifFile)).toBe(false)
   })
})
