import Redis from 'ioredis'
import R from 'ramda'

const MAX_RETRY: number = 5
const redis = new Redis('localhost:6380')
// 如果沒有加上 NX -> 一直 set -> overwrite -> ret OK
// 如果有加上 NX -> 一直 set -> overwrite -> ret nil

let res

(async () => {

  try {
    for (let i = 0; i < MAX_RETRY; i++) {
      res = await setToken()
      if (res !== null) { // set success
        console.log('break')
        break
      }
    }

  } catch (error) {

  } finally {
    redis.quit()

    console.log('=====> res: ', res)


  }

})()


async function setToken() {
  const token = '2234'
  return await redis.set(token, 'bar', 'EX', 10, 'NX')

}

