const fs = require('node:fs')
const split2 = require('split2') // Break up a stream and reassemble it so that each line is a chunk.


const filePath = `a1.txt`

// stream with event way
// fs.createReadStream(filePath)
//   .pipe(split2(addQAtEnd))
//   .on('data', function (line) {
//     console.log(line);
//     //each chunk now is a separate line!
//   })
//


// async-iterator
async function main () {
  const stream = fs.createReadStream(filePath).pipe(split2(addQAtEnd))
  for await (const line of stream) {
    console.log(`You wrote: ${line}`)
  }
}
main()


function addQAtEnd(line) {
  return line + 'Q'
}