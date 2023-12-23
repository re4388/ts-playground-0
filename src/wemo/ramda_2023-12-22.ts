import * as R from 'ramda'
import assert from 'node:assert'


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

