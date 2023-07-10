import * as R from 'ramda'

interface Maintenance {
  id: string
  scooterId: string
  itemId: string
  createdAt: Date
  verifiedAt: Date
}

export function ramdaPlay() {
  const recordA = {
    a: 12,
    b: 22,
    c: 33
  }
  let res = R.pick(['a', 'b', 'c'], recordA)
  console.log('=====> res: ', res)

  const r2 = {...res}
  console.log('r2', r2)

  // R.empty
  // R.empty('')
  // console.log('R.empty("")', R.empty(''))
  // R.empty('2')
  // console.log('R.empty("2")', R.empty('2'))

  // R.empty([])
  // console.log('R.empty([])', R.empty([]))
  // R.empty(['1'])
  // console.log("R.empty(['1'])", R.empty(['1']))
  // R.empty({})
  // console.log('R.empty({})', R.empty({}))
  // R.empty({ foo: 'bar' })
  // console.log("R.empty({foo: 'bar'})", R.empty({ foo: 'bar' }))

  // compose
  // const classyGreeting = (firstName: any, lastName: any) =>
  //   "The name's " + lastName + ", " + firstName + " " + lastName;
  // const yellGreeting = R.compose(R.toUpper, classyGreeting);
  // let a1 = yellGreeting("James", "Bond"); //=> "THE NAME'S BOND, JAMES BOND"
  // console.log("a1", a1);
  // let a2 = R.compose(Math.abs, R.add(1), R.multiply(2))(-4); //=> 7
  // console.log("a2", a2);
  //////////////////////////////////////////////////////////////////////////

  // const response = {
  //   data: [
  //     {
  //       id: 'id-1',
  //       scooterId: 'qat-001',
  //       itemId: 'item-001',
  //       createdAt: new Date(),
  //       verifiedAt: new Date()
  //     },
  //     {
  //       id: 'id-2',
  //       scooterId: 'qat-002',
  //       itemId: 'item-002',
  //       createdAt: new Date(),
  //       verifiedAt: new Date()
  //     }
  //   ]
  // }
  //
  // const maintenances = response.data.map((maintenance: Maintenance) =>
  //   R.pipe(
  //     R.pick(['id', 'scooterId', 'itemId']),
  //     R.evolve({
  //       id: (id) => id + ' postfix',
  //       createdAt: (createdAt) => createdAt.toISOString(),
  //       verifiedAt: (verifiedAt) => (verifiedAt ? verifiedAt.toISOString() : '')
  //     })
  //   )(maintenance)
  // )
  //
  // console.log('maintenances', maintenances)
}
