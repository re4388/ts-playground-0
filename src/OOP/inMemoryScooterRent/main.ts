import { User } from './user'
import { Rent } from './rent'
import { ScooterTypeA } from './scooterTypeA'
import { ScooterTypeB } from './scooterTypeB'



async function run() {
  let scooterA = new ScooterTypeA('ANC-123')
  let scooterB = new ScooterTypeB('BNZ-123')

  let rent = new Rent(scooterB) // 新增 scooterB, 這邊不用動
  let ben = new User('ben')


  ben.startRent(rent)

  await delay(2000)

  ben.finishRent(rent)



  let rentInMs = rent.getRentPeriodInMs()
  console.log("=====> rentInMs: ", rentInMs);
  let cost = rent.getRentFee()
  console.log("=====> cost: ", cost);
}


run().then(r => console.log('main is finished'))


function delay(ms: number) { // <-- 參數帶進來
  return new Promise((resolve, reject) => {
    // setTimeout 非同步呼叫
    setTimeout(() => {
      resolve(new Date())   //
    }, ms)      // <-- 因為參數要被 setTimeOut 使用
  })
}
