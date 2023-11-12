import crypto from 'node:crypto'

const version = process.version
console.log("=====> version: ", version);
const supportedHashAlgorithms = crypto.getHashes()
console.log("=====> supportedHashAlgorithms: ", supportedHashAlgorithms);




// export enum CreditCardErrorTypeV2 {
//   FORMAT = 'FORMAT',
//   EXPIRE =  'EXPIRE',
// }
//
//
// console.log(CreditCardErrorTypeV2.EXPIRE)
//
//
// export enum CreditCardErrorType {
//   FORMAT,
//   EXPIRE,
//   NOT_SUPPORT,
//   AUTH,
//   DUPLICATE,
//   ERROR
// }
//
//
// console.log(CreditCardErrorType.ERROR)
