import fs from 'fs'

// simple use file system as our store

fs.writeFileSync('/tmp/count.txt', '0') // only run once


function setUrl(url) {
  // get id from file
  const fileContent = fs.readFileSync('/tmp/count.txt')
  // increment
  const id = Number(fileContent.toString()) + 1

  // write back
  fs.writeFileSync('/tmp/count.txt', String(id))

  // write into another file for record
  fs.writeFileSync(`/tmp/${id}.txt`, url)

  // ret url
  return `sho.rt/${id}`
}

function getUrl(code) {
  return fs.readFileSync(`/tmp/${code}.txt`).toString()
}
