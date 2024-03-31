import express from 'express'
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

// 參考 [用 Node.js 建立一個簡單的 Http Proxy. 在上一篇文章中我們了解了 proxy pattern… | by 莫力全 Kyle Mo | Medium](https://oldmo860617.medium.com/%E7%94%A8-node-js-%E5%BB%BA%E7%AB%8B%E4%B8%80%E5%80%8B%E7%B0%A1%E5%96%AE%E7%9A%84-http-proxy-5262e349a1ad)

const app = express()

/**
 * Proxy endpoints
 * 如果 request 的 route 符合 /my-service/* 就會幫我們將 request 轉發到 target URL 去
 * 以我們的例子而言就是 JSONPlaceholder API
 *
 * pathRewrite 則是可以將指定的 path 替換掉，這邊的例子就是把 my-service 取代成空字串
 * 舉個例子，如果我們發一個 request 到 http://localhost:3000/my-service/posts/1，
 * 經過 proxy 後實際會將 request 發送到 https://jsonplaceholder.typicode.com/posts/1，my-service 會被空字串取代，而保留 post/1
 *
 * 這樣有什麼好處?
 *
 * 因為過了我這個 proxy, 我就可以做事情
 *
 * 發過去 https://jsonplaceholder.typicode.com 前，我可以做一些事情
 * 像是：
 * 1. 加入一些 header
 * 2. 加入一些 query string
 * 3. 加入一些 body
 * 7. 做一些 cache
 * 8. 做一些 rate limit
 * 9. 做一些 retry
 * 10. 做一些 circuit breaker
 * 11. 做一些 fallback
 * 12. 做一些 mock
 * 13. 做一些 transform -> 這邊的應用可多了，類似你可以利用 LLM 做一些事情?之類的
 * 14. 做一些 filter
 * 15. 做一些 throttle
 * 16. 做一些 logging
 * 17. 做一些 monitoring
 * 18. 做一些 alerting
 * 19. 做一些 tracing
 * 20. 做一些 metrics
 * 21. 做一些 security
 * 22. 做一些 auth
 * 23. 做一些 authorization
 * 24. 做一些 validation...
 *
 * 收到  https://jsonplaceholder.typicode.com 的 response 後，我也可以做一些事情
 * ..等等等
 * 類似 enrich 然後再發回去
 */

/** @type {import('http-proxy-middleware/dist/types').Options} */
const options: import('http-proxy-middleware/dist/types').Options = {
  target: 'https://jsonplaceholder.typicode.com/todos/1',
  changeOrigin: true,
  pathRewrite: {
    [`^/my-service`]: ''
  },
  onProxyReq: (proxyReq, req, res) => {
    // Modify request header
    // proxyReq.setHeader('user-agent', 'axios/1.6.3')
    proxyReq.setHeader('x-added', 'foobar')
    console.log('q', req.headers)
  },

  /**
   * IMPORTANT: avoid res.end being called automatically
   * 這個要啟動， 這樣才可以自己 handle response
   **/
  // selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()

  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers['x-added'] = 'foobar' // add new header to response
    // Modify response

    let uint8Array: Uint8Array[] = []
    proxyRes.on('data', function (chunk) {
      uint8Array.push(chunk)
    })

    proxyRes.on('end', function () {
      console.log('res from proxied server:', uint8Array)

      // 這邊可能還要解壓縮 XD
      // const buffer = Buffer.from(Buffer.concat(uint8Array))
      // console.log('=====> buffer: ', buffer)
      // const json = buffer.toString()
      // console.log('=====> json: ', json)
      //
      // res.end(json)
      // res.end(body.toString())
      // res.end('hello')
    })

    // responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    //   const response = responseBuffer.toString('utf8') // convert buffer to string
    //   return response.replace('Hello', 'Goodbye') // manipulate response and return the result
    // })
  }

  /**
   * Intercept response and replace 'Hello' with 'Goodbye'
   **/
  // on: {
  //   proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
  //     const response = responseBuffer.toString('utf8') // convert buffer to string
  //     return response.replace('Hello', 'Goodbye') // manipulate response and return the result
  //   })
  // }
}
const proxyMiddleware = createProxyMiddleware(options)

app.use('/my-service', proxyMiddleware)

// // Middleware to modify request header
// app.use((req, res, next) => {
//   req.headers['x-ben-added'] = 'test0'
//   next()
// })

// start the Proxy Server
const PORT = 3011
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})

// try out
// httpie:
// http localhost:3011/my-service
