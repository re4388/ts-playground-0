import { EventEmitter } from 'events'
import { readFile } from 'fs'


class FindRegexClass extends EventEmitter {
  constructor() {
    super()
  }

  addFile(files) {
    this.files = files
    return this
  }

  setRegex(regex) {
    this.regex = regex
    return this
  }

  find() {
    for (const file of this.files) {
      readFile(file, 'utf-8', (err, data) => {

        if (err) {
          this.emit('error', err)
        }

        this.emit('file_read', file)

        const match = data.match(this.regex)
        if (match) {
          match.forEach(ele => this.emit('found', file, match))
        }
      })
    }

    return this
  }
}


let fileRegx = new FindRegexClass()
fileRegx
  .addFile(['fileA.txt', 'fileB.json'])
  .setRegex(/hello \w+/g)
  .find()
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`))


///////////////////

function findRegexFn(files, regex) {

  let emitter = new EventEmitter()


  for (const file of files) {
    readFile(file, 'utf-8', (err, data) => {

      if (err) {
        emitter.emit('error', err)
      }

      emitter.emit('file_read', file)

      const match = data.match(regex)
      if (match) {
        match.forEach(ele => emitter.emit('found', file, match))
      }
    })
  }

  return emitter
}


// findRegexFn(['fileA.txt', 'fileB.json'], /hello \w+/g)
//   .on('fileread', file => console.log(`${file} was read`))
//   .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
//   .on('error', err => console.error(`Error emitted ${err.message}`))