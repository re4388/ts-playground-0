import * as dns from 'dns'

const dnsPromises = require('node:dns').promises

// ts-node dns_obj.ts 'www.github.com'

// const domain = process.argv[2]

// dns.lookup(domain, function onLookup(err, address, family) {
//
//   if (err) {
//     console.log(err.stack)
//   }
//   console.log('ip 地址:', address)
//
//   dns.reverse(address, function(err, hostnames) {
//     if (err) {
//       console.log(err.stack)
//     }
//
//   console.log("=====> hostnames: ", hostnames);
//     console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames))
//   })
// })

async function dnsLookup(domain: string) {
  const res = await dnsPromises.resolveAny(domain)
  console.log('=====> ip: ', res)
}

// dnsLookup(`www.wemoscooter.com`)


async function dnsReverse(ip: string) {
  const res = await dnsPromises.reverse(ip)
  console.log('=====> hostname: ', res)
}

dnsReverse('34.85.70.119')
