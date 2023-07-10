// disadvantage to use this local-like cache mechanism:
// this is not external cache service, like redis, so it is not suitable when u have multuple instance
// also save the error response
// all cache gone when the instance restart -> a lot of cache miss when restart (and a burst of upstream server/github when restart)


import fastify from 'fastify'
import { LRUCache } from 'lru-cache'


const options = {
  // At least one of 'max', 'ttl', or 'maxSize' is required, to prevent
  // unsafe unbounded storage.
  // In most cases, it's best to specify a max for performance, so all
  // the required memory allocation is done up-front.
  // All the other options are optional, see the sections below for
  // documentation on what each one does.  Most of them can be
  // overridden for specific items in get()/set()
  max: 500,
  // for use with tracking overall storage size
  maxSize: 5000,
  // how long to live in ms
  ttl: 1000 * 60 * 5,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false
}

const cache = new LRUCache(options)
const server = fastify()
const PORT = process.env.PORT || 3000

interface ReqParamAccount {
  account: string
}


server.get('/account/:account', async (req, reply) => {
  const acc = (<ReqParamAccount>(req.params)).account
  return getAccount(acc)
})
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))

async function getAccount(account: string) {
  const cached = cache.get(account)
  if (cached) {
    console.log('cache hit')
    return JSON.parse(cached as string)
  }
  console.log('cache miss')
  const result = await fetch(`https://api.github.com/users/${account}`)
  const body = await result.text()
  cache.set(account, body)
  return JSON.parse(body)
}