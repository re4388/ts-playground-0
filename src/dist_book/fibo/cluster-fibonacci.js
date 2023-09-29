// npm install fastify@3.2
const server = require('fastify')()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000

console.log(`worker pid=${process.pid}`)


// The service has a single route, /<limit>, where limit is the number of iterations to count.
server.get('/:limit', async (req, reply) => {
  return String(fibonacci(Number(req.params.limit)))
})
server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`)
})

// The fibonacci() method does a lot of CPU-intensive math and blocks the event loop.
function fibonacci(limit) {
  let prev = 1n, next = 0n, swap
  while (limit) {
    swap = prev
    prev = prev + next
    next = swap
    limit--
  }
  return next
}