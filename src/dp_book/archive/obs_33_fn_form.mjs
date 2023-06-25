import { EventEmitter } from 'events'
import { readFile } from 'fs'

function findRegex(files, regex) {

  const emitter = new EventEmitter()

  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {

      if (err) {
        return emitter.emit('error', err)
      }

      emitter.emit('file_read', file)

      const match = content.match(regex)
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem))
      }
    })
  }
  return emitter
}


findRegex(
  ['a1.txt', 'valid_json.json'],
  /hello \w+/g
)
  .on('file_read', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`))