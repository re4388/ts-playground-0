import httpProxy from 'http-proxy'
import express from 'express'
import axios from 'axios'

// ref https://masteringjs.io/tutorials/node/http-proxy

export async function proxyServerWithExpress() {
  // Create a proxy server (using express) and listen on port 3000
  const proxy = httpProxy.createProxyServer({})

  /**
   * With a proxy server, there's two HTTP requests: the inbound request that the proxy server received,
   * and the outbound request that the proxy server sends.
   *
   * Many proxy servers modify outbound requests. For example, you may want your proxy server to set an HTTP header.
   * In order to modify the outbound request, you need to listen to http-proxy's 'proxyReq' event,
   * which gives you access to the outbound request that http-proxy will send.
   *
   * For example, here's how you can set the 'Authorization' header on all outbound requests:
   */
  proxy.on('proxyReq', function (proxyReq) {
    // proxyReq.setHeader('Authorization', 'my-secret-key')
    proxyReq.setHeader('foo', 'bar')
  })

  // modify response
  proxy.on('proxyRes', function (proxyRes, req, res) {
    let body: Uint8Array[] = []
    let bodyString: string
    proxyRes.on('data', function (chunk) {
      body.push(chunk)
    })

    proxyRes.on('end', function () {
      bodyString = Buffer.concat(body).toString()
      console.log('res from proxied server:', body)
      res.end(body.toString())
    })
  })

  const app = express()
  app.get('*', function (req, res) {
    // Prints "Request GET https://httpbin.org/get?answer=42"
    console.log('Request', req.method, req.url)
    const target = `${req.protocol}://${req.hostname}`
    console.log('target', target)
    proxy.web(req, res, { target: target })
  })

  const server = await app.listen(9000)

  /**
   * let's call a api using a proxy server, which is setup above using express
   * or using curl:
   * curl --proxy 127.0.0.1:9000 http://httpbin.org/get\?answer\=42
   */
  // const res = await axios.get('http://httpbin.org/get?answer=42', {
  //   proxy: {
  //     host: 'localhost',
  //     port: 3000
  //   }
  // })
  // console.log(res.data)
}
