import moment from 'moment'

// import * as moment from 'moment'

// let a3 = moment.utc().toString()
// console.log('------->a3: ', a3)
//
// import { utc } from 'moment'
//
// let a1 = utc().toDate().toString()
// console.log('------->a1: ', a1)
// let a2 = utc().toString()
// console.log('------->a2: ', a2)

// console.log(`SELECT * FROM tmp WHERE '${utc()}' BETWEEN "loginStartAt" AND "loginEndAt"`)

// function getInvoiceAwardDate(): Date {
//   const currentDate = new Date('Mar 20, 2024 @ 11:05:11.363')
//   const dateAfter = moment(currentDate).utcOffset('+0800').subtract(6, 'months').startOf('month')
//   if (dateAfter.month() % 2 === 1) {
//     dateAfter.add(1, 'month')
//   }
//   return dateAfter.toDate()
// }
//
// let a1 = getInvoiceAwardDate()
// // console.log(a1)
//
// const orderDate = moment(a1).subtract(1, 'months').toDate()
// console.log(orderDate)

const userV0 = [
  {
    id: '96206',
    firstName: '子禮',
    lastName: '林',
    idcard: 'A124929352',
    phone: '0952516595',
    address: '台北市信義區基隆路一段143號10F-6',
    contactEmail: 'asdfon@gmail.com',
    statusId: 4,
    isPhoneVerified: false,
    nationality: null
  },
  {
    id: '803336',
    firstName: '子灃',
    lastName: '林',
    idcard: 'A124929352',
    phone: '+886952516595',
    address: '台北市松山區敦化南路一段80巷32號7樓',
    contactEmail: 'asdfon@gmail.com',
    statusId: 1,
    isPhoneVerified: true,
    nationality: 'TWN'
  }
]

const res = userV0.filter((user: { phone: string }) => {
  const last9 = '0952516595'.match(/\d+(\d{9})$/)
  if (last9) {
    return user.phone.includes(last9[1])
  }
  return false
})
if (res.length === 0) {
  throw new Error('user phone is invalid')
}

const { id: userId } = res[0]
console.log('------->userId: ', userId)
