import * as R from 'ramda'

const managerIds: never[] = []

const managers = R.isEmpty(managerIds) ? [] : [23]
console.log('=====> managers: ', managers)

let res = managers.map((manager: any) => {
  console.log(manager)
})
console.log('=====> res: ', res)

// const managerIdToEmailNameMap = toKeyValuePair(
//   'id',
//   'name',
//   managers.map((manager) => ({
//     id: manager.id,
//     name: `${manager.email}@`.split('@')[0]
//   }))
// )
