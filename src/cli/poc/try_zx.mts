import { fetch } from 'zx';
import 'zx/globals'


// await $`lsof -iTCP -sTCP:LISTEN`
// await $`lsof -iTCP -sTCP:LISTEN | awk  '{print $1, $2,$9}'`


// const bear = await question('What kind of bear is best? ')
// console.log("------->bear: ", bear);

// const node = await which('node')
// console.log("------->node: ", node);


// run in this way: ..../src/cli/poc/try_zx.mts -a 33
// if (argv.a) {
//   console.log(argv.a)
//   echo('yes')
// }

// await $`cat getUserToken.mts | grep getTime`


// console.log(chalk.blue('Hello world!'))



// const a1 = await fs.readJson('./package.json')
// console.log("------->a1: ", a1);


// const resp = await fetch('https://medv.io')
// if(resp.body === null) {
//   process.exit(0)
// }
// for await (const chunk of resp.body) {
//   echo(chunk)
// }

