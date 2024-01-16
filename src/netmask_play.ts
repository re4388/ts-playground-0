import { Netmask } from "netmask";

const block = new Netmask("210.68.77.192/26");
console.log("------->block: ", block);

export function netmask() {
  console.log(block.size);

  // block.base;                     // 10.0.0.0
  // block.mask;                     // 255.240.0.0
  // block.bitmask;                  // 12
  // block.hostmask;                 // 0.15.255.255
  // block.broadcast;                // 10.15.255.255
  // block.size;                     // 1048576
  // block.first;                    // 10.0.0.1
  // block.last;                     // 10.15.255.254

  // block.contains('10.0.8.10');    // true
  // block.contains('10.8.0.10');    // true
  // block.contains('192.168.1.20'); // false

  // block.forEach(function(ip, long, index));

  const allAllowedIps: string[] = [];
  block.forEach((ip, long, idx) => {
    allAllowedIps.push(ip);
  });
  const randomIdx = Math.floor(Math.random() * block.size);
  let allowedIp = allAllowedIps[randomIdx];

  console.log(allowedIp);

  // console.log("block", block);

  // block.next()                    // Netmask('10.16.0.0/12')
}
