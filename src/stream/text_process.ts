import { createGzip, createGunzip } from 'zlib'
import { Transform, pipeline } from 'stream'
import { promisify } from 'util'

const pipelinePromise = promisify(pipeline)

const uppercase = new Transform({
  transform (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

async function main () {
  try {
    await pipelinePromise(
      process.stdin,
      createGunzip(),
      uppercase,
      createGzip(),
      process.stdout
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()


//
// To run the example:
// echo 'Hello World!' | gzip | ts-node text_process.ts | gunzip
// or use js, faster
// npx tsc text_process.ts -> compiled to js
// open terminal in this dir
// echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip
// or


// HELLO WORLD!
