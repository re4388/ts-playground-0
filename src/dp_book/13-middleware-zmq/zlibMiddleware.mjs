import { inflateRaw, deflateRaw } from 'zlib'
import { promisify } from 'util'

const decompressAsync = promisify(inflateRaw)
const compressAsync = promisify(deflateRaw)

export const zlibMiddleware = function () {
  return {
    /**
     * @param {string} message
     */
    inbound (message) {
      // var buf1 = Buffer.from("hello"); => <Buffer 68 65 6c 6c 6f>
      return decompressAsync(Buffer.from(message))
    },
    outbound (message) {
      return compressAsync(message)
    }
  }
}
