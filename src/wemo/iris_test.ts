
// or use util
import { promisify } from "util"
const sleep = promisify(setTimeout)
sleep(1000)

export async function irisControl(){
  console.log('qq')
  await sleep(10000)
  console.log('after 10')
}

async function standardPowerOffAndReturn() {
  irisControl()
    .then(() => {
      console.log('iris return command')
        return irisControl()
    })
    .catch((error: Error) => {
      console.log('err')
    })

}


async function returnScooter() {
  await standardPowerOffAndReturn()
  console.log('wait?')
}

returnScooter()

// let a1 = control()
// console.log("=====> a1: ", a1);
// console.log('23')
//
// =====> a1:  Promise { '22' }
// 23
