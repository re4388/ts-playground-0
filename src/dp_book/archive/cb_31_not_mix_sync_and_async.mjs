import { readFile } from 'fs'

const cache = new Map()

function index(filename, cb) {
  if (cache.has(filename)) {

    // 原本的寫法, 這樣這邊釋 sync, 下面為 async, 這樣會出事
    // cb(cache.get(filename))

    /**
     * 1. process.nextTick: microtask queue, before all IO event
     * 2. setImmediate after all IO event
     * 3. setTimeout: 比 setImmediate 慢呼叫，since it is a macrotask
     * 會到一整個 event loop 後 (microtask queue is a small event loop inside a macrotask event loop）
     */
    process.nextTick(() => cb(cache.get(filename)))

  } else {

    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}

function createFileReader(filename) {
  const readerList = []
  index(filename, (cb) => {
    readerList.forEach( (reader) => reader(cb))
  })
  return {
    onDataReady: (reader) => readerList.push(reader)
  }
}


const reader1 = createFileReader('a1.txt')
reader1.onDataReady((reader) => {
  console.log(`First call data: ${reader}`)
  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader('a1.txt')
  reader2.onDataReady((reader) => {
    console.log(`Second call data: ${reader}`)
  })
})