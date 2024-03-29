const fetch = require('node-fetch')
const server = require('fastify')()
// docker run --name distnode-memcached -p 11211:11211 -it --rm memcached:1.6-alpine memcached -m 64 -vv
const memcache = require('memjs').Client.create('localhost:11211')


const PORT = process.env.PORT || 3000

server.get('/account/:account', async (req, reply) => {
  return getAccount(req.params.account)
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))

async function getAccount(account) {

  const { value: cached } = await memcache.get(account)
  if (cached) {
    console.log('cache hit')
    return JSON.parse(cached)
  }

  console.log('cache miss')

  const result = await fetch(`https://api.github.com/users/${account}`)
  const body = await result.text()
  await memcache.set(account, body, {})
  return JSON.parse(body)
}