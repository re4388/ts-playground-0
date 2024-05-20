const HOST = '127.0.0.1'
const PORT = 3000
require('http')
  .createServer((req, res) => {
    res.end('ok')
  })
  .listen(PORT, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`)
  })
