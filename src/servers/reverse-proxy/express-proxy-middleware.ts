import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

// 參考 [用 Node.js 建立一個簡單的 Http Proxy. 在上一篇文章中我們了解了 proxy pattern… | by 莫力全 Kyle Mo | Medium](https://oldmo860617.medium.com/%E7%94%A8-node-js-%E5%BB%BA%E7%AB%8B%E4%B8%80%E5%80%8B%E7%B0%A1%E5%96%AE%E7%9A%84-http-proxy-5262e349a1ad)

export function expressProxy() {
  const app = express()

  // Configuration
  const PORT = 3000
  const HOST = 'localhost'

  /**
   * Proxy endpoints
   * 如果 request 的 route 符合 /my-service/* 就會幫我們將 request 轉發到 target URL 去
   * 以我們的例子而言就是 JSONPlaceholder API
   *
   * pathRewrite 則是可以將指定的 path 替換掉，這邊的例子就是把 my-service 取代成空字串
   * 舉個例子，如果我們發一個 request 到 http://localhost:3000/my-service/posts/1，
   * 經過 proxy 後實際會將 request 發送到 https://jsonplaceholder.typicode.com/posts/1，my-service 會被空字串取代，而保留 post/1
   *
   */
  app.use(
    '/my-service',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com',
      changeOrigin: true,
      pathRewrite: {
        [`^/my-service`]: ''
      }
    })
  )

  // Start Proxy
  app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`)
  })
}
