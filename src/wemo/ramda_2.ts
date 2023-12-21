import * as R from 'ramda'

interface UserBatSwapBonus {
  bonusAmount: number
}

interface NextRewardInfo {
  swappedCount: number
  notifyBatPercent: number
  rewardIndex: any
  bonusConfig?: UserBatSwapBonus
}

// const nextRewardInfo:NextRewardInfo = {
//   notifyBatPercent: 0,
//   swappedCount: 0,
//    rewardIndex: {
//       rewardAmount: 30
//    },
//    bonusConfig: {
//       bonusAmount: 20s
//    }
// }

const nextRewardInfo:NextRewardInfo = {
  notifyBatPercent: 0,
  swappedCount: 0,
  rewardIndex: {
    rewardAmount: 30
  },
  bonusConfig: undefined
}

const rebateVoucherTotalAmount = nextRewardInfo.rewardIndex?.rewardAmount + R.defaultTo(0, nextRewardInfo.bonusConfig?.bonusAmount)
console.log("rebateVoucherTotalAmount", rebateVoucherTotalAmount);


export {}
