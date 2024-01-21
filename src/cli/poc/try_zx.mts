import { $ } from 'zx'



// await $`lsof -iTCP -sTCP:LISTEN`
await $`lsof -iTCP -sTCP:LISTEN | awk  '{print $1, $2,$9}'`






// await $`cat getUserToken.mts | grep getTime`
