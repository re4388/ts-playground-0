import http from 'http'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

const argv: any = yargs(hideBin(process.argv)).argv

// .xxxx.ts --port=3001
const http_server_port = argv.port
let httpServer = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`<html><body><p>${http_server_port}</p></body></html>`)
      break
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end(`Not Found at ${http_server_port}`)
  }
})

httpServer.listen(http_server_port)
