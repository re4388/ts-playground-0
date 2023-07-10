import path from 'path'
import { createReadStream } from 'fs'
import consumers from 'stream/consumers'

const __dirname = new URL('.', import.meta.url).pathname;
const readable = createReadStream(path.join(__dirname, 'apollo'))
const data = await consumers.buffer(readable)
console.log(data)