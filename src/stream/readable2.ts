import path from 'path'
import { createReadStream } from 'fs'
import consumers from 'stream/consumers'

export async function readBuffer() {
  const readable2 = createReadStream(path.join(__dirname, 'apollo'))
  const data = await consumers.buffer(readable2)
  console.log(data)
}