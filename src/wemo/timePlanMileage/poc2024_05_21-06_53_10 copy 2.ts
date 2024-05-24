import * as R from 'ramda'

// const orderIds1 = [1, 2, 3, 4, 5]
// const orderIds2: number[] = []

// // 如果 orderIds 是空陣列，則返回 true，否則返回 false
// let res = R.isEmpty([])
// console.log('res', res)

export enum WalletOperationType {
  riding = 0,
  orderRefund,
  cancel,
  walletRefund,
  accountingOperation,
  timePlan,
  arrearsPayment,
  vip
}

const a1 = typeof WalletOperationType.cancel
console.log('a1', a1)
const a2 = typeof `${WalletOperationType.cancel}`
console.log('a2', a2)
