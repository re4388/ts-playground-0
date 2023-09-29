import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Proxy URL
const proxyUrl = 'http://127.0.0.1:8118';

// Create a custom HTTP agent with the proxy
const proxyAgent = new HttpsProxyAgent(proxyUrl);

let count = 0


async function run() {
  fetch("https://welfare.gov.taipei/Kids/Supplies/UpdateVoteCount", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "Referer": "https://welfare.gov.taipei/Kids/Supplies/Supplies105",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "posterId=556",
    "method": "POST",

    agent: proxyAgent, // Use the proxy agent
  }).then(res => {
    console.log(res.status)
    count++
    console.log(count)
  })
    .catch(err => console.log(err))

}

const randomFactor = Math.random()
const runInSec = 1000 * 2 * (1 + 0.1 * randomFactor)


//////////// MAIN //////////////
setInterval(run, runInSec)














// 我在 GCP 開一個 vm ，然後打到那邊確認 proxyAgenet work
async function tryTorPoxy(){
  const response = await fetch('http://35.206.223.198:3001', {
    agent: proxyAgent, // Use the proxy agent
  });
  const body = await response.text();

  console.log(body);
}

// tryTorPoxy()


/////////////  vm 裡面的 code ////////////

// import http from 'http'
// const http_server_port= 3001
// let httpServer = http.createServer((req, res) => {
//   switch (req.url) {
//     case '/':
//       const remoteAddress = req.connection.remoteAddress;
//       console.log('Incoming request from:', remoteAddress);
//       res.writeHead(200, { 'Content-Type': 'text/html' })
//       res.end(`<html><body><p>${http_server_port}</p></body></html>`)
//       break
//     default:
//       res.writeHead(404, { 'Content-Type': 'text/plain' })
//       res.end(`Not Found at ${http_server_port}`)
//   }
// })
//
// httpServer.listen(http_server_port)






// fetch("https://welfare.gov.taipei/Kids/Supplies/UpdateVoteCount", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
//     "cache-control": "no-cache",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "Referer": "https://welfare.gov.taipei/Kids/Supplies/Supplies105",
//     "Referrer-Policy": "strict-origin-when-cross-origin"
//   },
//   "body": "posterId=556",
//   "method": "POST"
// });
//

