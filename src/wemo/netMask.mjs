const block = new Netmask(faker.random.arrayElement([every8dNetWork, weMoNetWork]))

const randomIdx = Math.floor(Math.random() * 2)

const allAllowedIps = []

block.forEach((ip, _long, _idx) => {
  allAllowedIps.push(ip)
})


let res = allAllowedIps[randomIdx]
console.log("res", res);
