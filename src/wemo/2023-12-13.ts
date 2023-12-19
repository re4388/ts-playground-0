import * as R from 'ramda'


let bc = {
  "classes": [
    {
      "level": 1,
      "indexes": [
        {
          "index": 1,
          "rewardAmount": 20
        },
        {
          "index": 2,
          "rewardAmount": 30
        },
        {
          "index": 3,
          "rewardAmount": 40
        },
        {
          "index": 4,
          "rewardAmount": 50
        },
        {
          "index": 5,
          "rewardAmount": 60
        }
      ],
      "batPercent": 30
    },
    {
      "level": 2,
      "indexes": [
        {
          "index": 1,
          "rewardAmount": 40
        }
      ],
      "batPercent": 15
    },
    {
      "level": 3,
      "indexes": [
        {
          "index": 1,
          "rewardAmount": 50
        }
      ],
      "batPercent": 5
    }
  ],
  "bonusEvents": [
    {
      "endAt": "2024-12-31T15:59:59.999Z",
      "startAt": "2023-12-31T16:00:00.000Z",
      "bonusAmount": 10
    }
  ]
}


let levels  = bc.classes.map(level => level.batPercent)




function createCheckingInterval(levels: number[] ){
  const res = [...levels, -1]
  res.sort((a, b) => b - a);

  let result = []
  for (let i = 0; i < res.length-1; i++) {
    let cur = res[i]
    let next = res[i+1] + 1
    result.push([cur, next])
  }
  return result
}

let checkingIntervals = createCheckingInterval(levels)
console.log("------->checkingIntervals: ", checkingIntervals);


const batPercent = 30

function checkNotifyLevel(batPercent: number,  checkingIntervals:number[][]){
  console.log("------->batPercent: ", batPercent);
  if(isExistInRedis()) return undefined

  for (let i = 0; i < checkingIntervals.length; i++) {
    let ingInterval = checkingIntervals[i]
    if(ingInterval[0] >= batPercent && batPercent >= ingInterval[1]){
      return i
    }
  }
}

const rentId = 123

for (let i = 40; i >=0 ; i--) {
  let batLowLevel = checkNotifyLevel(i, checkingIntervals)
  // console.log("------->batLowLevel: ", batLowLevel);
  const key = `lowBatNotify':'+ ${rentId} + 'level' + ${batLowLevel}`
  console.log("------->key: ", key);
  addToRedisSet(key)
}


function sendNotify(){
  ActualSendNotify()

  // addToRedisSet('lowBatNotify:'+ rentId + 'level' + res2)
}


function ActualSendNotify(){
  //

}


function addToRedisSet(str: string){
  return true
}


function isExistInRedis(){
  return false
}


