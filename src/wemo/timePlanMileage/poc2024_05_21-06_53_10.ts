// import { ObjectLiteral } from 'typeorm'
import * as R from 'ramda'

// // 定義一個 Entity 類型，它是一個包含任意屬性的物件
// type Entity = {
//   [key: string]: any
// } & ObjectLiteral

// // 將陣列轉換為分組的 Map
// export function arrayToGroupedMap<T extends Entity, P extends keyof T, Q extends undefined>(
//   array: T[],
//   key: P,
//   value?: Q
// ): Map<T[P], T[]>
// export function arrayToGroupedMap<T extends Entity, P extends keyof T, Q extends keyof T>(
//   array: T[],
//   key: P,
//   value: Q
// ): Map<T[P], T[Q][]>
// export function arrayToGroupedMap<T extends Entity, P extends keyof T, Q extends keyof T>(
//   array: T[],
//   key: P,
//   value?: Q
// ): Map<T[P], T[] | T[Q][]> {
//   // 創建一個空的 Map 來存儲結果
//   const result = new Map<T[P], T[] | T[Q][]>()

//   // 遍歷陣列中的每個實體
//   array.forEach((entity) => {
//     // 獲取鍵值和值
//     const k = entity[key]
//     const v = R.isNil(value) ? entity : entity[value]

//     // 如果 Map 中不存在該鍵，則創建一個空陣列
//     if (!result.has(k)) {
//       result.set(k, [])
//     }

//     // 將值添加到對應的鍵的陣列中
//     result[k].push(v)
//   })

//   // 返回結果
//   return result
// }

export function arrayToGroupedMap(array: any, key: any, value?: any) {
  const result = new Map()

  array.forEach((entity: any) => {
    // 獲取鍵值和值
    const k = entity[key]
    console.log("k", k);
    const v = R.isNil(value) ? entity : entity[value]
    console.log("v", v);

    // 如果 Map 中不存在該鍵，則創建一個空陣列
    if (!result.has(k)) {
      result.set(k, [])
    }
    
    const a1 = result.get(k)
    a1
    let a2 = result['Alice']
    a2

    // 將值添加到對應的鍵的陣列中
    //@ts-ignore
    result.get(k).push(v)
  })

  // 返回結果
  return result
}

// 針對上面這個函數，請給我 input 和經過這個函數處理的 output
// 這樣我就可以幫你寫測試了
export const orders = [
  { id: 1, orderItems: 'Alice', age: 30 },
  { id: 2, orderItems: 'Bob', age: 25 },
  { id: 3, orderItems: 'Alice', age: 35 },
  { id: 4, orderItems: 'Bob', age: 40 }
]

let res = arrayToGroupedMap(orders, 'orderItems', 'age')
console.log('res', res)

// expect(res).toEqual({
//   Alice: [
//     { id: 1, orderItems: 'Alice', age: 30 },
//     { id: 3, orderItems: 'Alice', age: 35 }
//   ],
//   Bob: [
//     { id: 2, orderItems: 'Bob', age: 25 },
//     { id: 4, orderItems: 'Bob', age: 40 }
//   ],
// })
