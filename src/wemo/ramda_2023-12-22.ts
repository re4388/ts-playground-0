import * as R from 'ramda'
import assert from 'node:assert'


// groupBy
// 先用 R.groupBy 依照某個 input 的 prop 來進行邏輯分組， 類似 return A, B, C 三組
// return 一個 groupByX
// 然後用這個 groupByX(input)
// input 是 array ob objects
// 會變成類似 A: [o1, o2], B: [o3], C: [o4]


const byGrade = R.groupBy((student: any) => {
  const score = student.score
  return score < 65 ? 'F' :
    score < 70 ? 'D' :
      score < 80 ? 'C' :
        score < 90 ? 'B' : 'A'
})

const students = [
  { name: 'Abby', score: 84 },
  { name: 'Eddy', score: 58 },
  { name: 'Jack', score: 69 }]

let resGroupBy = byGrade(students)
console.log('------->resGroupBy: ', resGroupBy)

// {
//     B: [ { name: 'Abby', score: 84 } ],
//     F: [ { name: 'Eddy', score: 58 } ],
//     D: [ { name: 'Jack', score: 69 } ]
// }


// example:
//  const groupById = groupBy((item: { id: string; name: string }) => item.id)
//  repairMaterials:  [ { id: '99', name: 'repairMaterial99' } ]
//  groupById(repairItems):  { '89': [ { id: '89', name: 'repairItem89' } ] }


interface Input {
  odo: number
  name: string
}

const byOdo = R.groupBy((input: Input)  => {
  if (input.odo < 100) {
    return '100以下'
  } else {
    return '100以上'
  }
})

const input3: Input[] = [
  { odo: 103, name: 'jack' },
  { odo: 88, name: 'josh' },
  { odo: 120, name: 'ben' },
]

let resGroupByOdo = byOdo(input3)
console.log("------->resGroupByOdo: ", resGroupByOdo);
// {
//   '100以上': [ { odo: 103, name: 'jack' }, { odo: 120, name: 'ben' } ],
//   '100以下': [ { odo: 88, name: 'josh' } ]
// }



// 吃 array, 解一層 nest
let a1 = [1, 2, 3, 4, [5], [[1, 2, 3]]]
let res1 = R.unnest(a1)
assert.deepEqual(res1, [1, 2, 3, 4, 5, [1, 2, 3]])


// 吃 array, 挑出要的key, ret array, 把那些 val 放在 array 中
let a2 = [
  {
    name: 'ben',
    age: 22
  },
  {
    name: 'jack',
    age: 99
  }
]

let res2 = R.pluck('name', a2)
assert.deepEqual(res2, ['ben', 'jack'])


// 吃 obj, 拿掉指定的 key
let a3 =
  {
    name: 'ben',
    age: 22
  }

let res3 = R.omit(['age'], a3)
assert.deepEqual(res3, { name: 'ben' })

