import R from 'ramda'

interface Insurance {
  id: string
  userId: string
  rentId: string
  startAt: Date
  endAt: Date
  amount: number
  amountForVendor: number
  managerId: string
  comment: string
  note: string
  orderId: string
  deletedAt: Date
  paidAt: Date
  createdAt: Date
  updatedAt: Date
}


/**
 *  dropRepeats -> 連續出現的才 drop, 這跟 unique 不同
 */
function dropRepeats() {
  let a1 = ['a', 'b', 'b', 'c']
  let a2 = ['d', 'e', 'f', 'd']

  let a3 = R.concat(a1, a2)
  console.log('=====> a3: ', a3)

//
  let a4 = R.dropRepeats(a3)
  console.log('=====> a4: ', a4)
}

// forEachObjIndexed()


/**
 * 吃一個obj and fn
 * 把 fn 套用在 obj 上的 key value
 */
function forEachObjIndexed() {


  const boxMsgFromDB = {
    batId: null,
    batPercent: null,
    batVolt: null

  }


  const updateData = {
    batId: '22',
    batPercent: 23,
    batVolt: 33
  }

  console.log('=====> apply 前：boxMsgFromDB: ', boxMsgFromDB)

  R.forEachObjIndexed((val, key) => {
    // @ts-ignore
    boxMsgFromDB[key] = val
  }, updateData)

  console.log('=====> apply 後：boxMsgFromDB: ', boxMsgFromDB)

  // const printKeyConcatValue = (value: any, key: any) => console.log(key + ':' + value)
  // R.forEachObjIndexed(printKeyConcatValue, { x: 1, y: 2 }) //=> {x: 1, y: 2}

}


evolve()

/**
 * 針對每一個 obj 給定一個 transform 邏輯
 */
function evolve() {

  const tomato = {
    firstName: '  Tomato ',
    data: {
      elapsed: 100,
      remaining: 1400
    },
    id: 123
  }

  const transformations = {
    firstName: R.trim,
    lastName: R.trim, // Will not get invoked, 因為傳入的 obj 沒有這個屬性
    data: { elapsed: R.add(1), remaining: R.add(-1) }
  }

  R.evolve(transformations, tomato)
  // => {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}

  // Mock object 1
  const insuranceObject1 = {
    id: '1',
    userId: 'user123',
    rentId: 'rent456',
    startAt: new Date('2023-11-01'),
    endAt: new Date('2023-12-01'),
    amount: 500,
    amountForVendor: 450,
    managerId: 'manager789',
    comment: 'This is a comment for insurance',
    note: 'Additional note for insurance',
    orderId: 'orderABC',
    deletedAt: new Date('2023-11-15'),
    paidAt: new Date('2023-11-15'),
    createdAt: new Date('2023-10-15'),
    updatedAt: new Date('2023-11-20')
  }

// Mock object 2
  const insuranceObject2 = {
    id: '2',
    userId: 'user456',
    rentId: 'rent789',
    startAt: new Date('2023-12-05'),
    endAt: new Date('2024-01-05'),
    amount: 600,
    amountForVendor: 550,
    managerId: 'managerXYZ',
    comment: 'Another comment for insurance',
    note: 'Another additional note for insurance',
    orderId: 'orderDEF',
    deletedAt: null, // Assuming it's not deleted
    paidAt: new Date('2023-12-20'),
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2023-12-22')
  }

// You can use these objects as mock data for the Insurance interface


  const data = [insuranceObject1, insuranceObject2]
  ///////////////////// example2
  //@ts-ignore
  let a3 = data.map(R.evolve({ insurance: transformToInsuranceVoAndPickUndeleted }))
  console.log('=====> qq3: ', a3)

  function transformToInsuranceVoAndPickUndeleted(insurance?: Insurance[]) {
    if (R.isNil(insurance) || insurance.length === 0) {
      return undefined
    }
    const nonDeletedInsurance = insurance.find((i: Insurance) => R.isNil(i.deletedAt))
    console.log('=====> nonDeletedInsurance: ', nonDeletedInsurance)
    return nonDeletedInsurance ? R.pick(['id', 'amount'], nonDeletedInsurance) : undefined
  }

}
