const {
  Worker
} = require('node:worker_threads')


const sharedBuffer = new SharedArrayBuffer(4)
const buffer = new Buffer.from(sharedBuffer)

buffer.fill(5) // [5,5,5,5]

console.log('buffer before modify: ', buffer)


const worker = new Worker('./workerThread.js', {
  workerData: { sharedBuffer }
})


worker.once('message', () => {
  console.log('buffer after modify: ', buffer)
})
