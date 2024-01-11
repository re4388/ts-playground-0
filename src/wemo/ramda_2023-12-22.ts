import * as R from 'ramda'
import assert from 'node:assert'




// groupWith

//  兩兩比較
// R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
// //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
//
// R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
// //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
//
// R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
// //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
//
// 符合某種規則, 要加上  R.eqBy
// const isVowel = R.test(/^[aeiou]$/i);
// R.groupWith(R.eqBy(isVowel), 'aestiou')
// //=> ['ae', 'st', 'iou']

/**
 * R.groupWith(predicateFn, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> array of arrays, 會把 predicateFn 一樣結果的放在一起
 *
 */

function isAgeCanVote (age: number): boolean {
  return age >= 20
}

let a33= R.groupWith(R.eqBy(isAgeCanVote), [0, 1, 1, 2, 3, 5, 8, 13, 21])
console.log("------->a33: ", a33);



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


let a222 = [
  {
    id: 4,
    name: 'qs_01',
    repairItems: [
      { id: '2', name: 'DeletedItem / DeletedMaterial' },
      { id: '3', name: 'DeletedItem / DeletedMaterial' },
      { id: '1', name: 'r1' }
    ],
    repairMaterials: [
      { id: '21', name: 'DeletedItem / DeletedMaterial' },
      { id: '22', name: 'DeletedItem / DeletedMaterial' }
    ],
    type: 'B',
    vehicleModelId: '2'
  },
  {
    id: 2,
    name: 'qs_01',
    repairItems: [
      { id: '2', name: 'DeletedItem / DeletedMaterial' },
      { id: '3', name: 'DeletedItem / DeletedMaterial' },
      { id: '1', name: 'r1' }
    ],
    repairMaterials: [
      { id: '21', name: 'DeletedItem / DeletedMaterial' },
      { id: '22', name: 'DeletedItem / DeletedMaterial' }
    ],
    type: 'C',
    vehicleModelId: '2'
  }
]

let a222Res = R.pluck('type', a222)
console.log("------->a222Res: ", a222Res);

