import * as R from 'ramda'

interface Maintenance {
  id: string
  scooterId: string
  itemId: string
  createdAt: Date
  verifiedAt: Date
}

export function ramdaPlay() {

  //////////////////////////////////////////////////////////////////////////////////////////

  //
  // R.isEmpty({});                  //=> true
  // R.isEmpty(Uint8Array.from('')); //=> true
  // R.isEmpty([]);                  //=> true
  // R.isEmpty('');                  //=> true, 留意， '' is empty

  // R.isEmpty(null);                //=> false, 留意， null is not empty
  // R.isEmpty([1, 2, 3]);           //=> false
  // R.isEmpty({length: 0});         //=> false

  // best practice: for a string type, use isNil and isEmpty to check (unless you accept '' as a valid one)
  // ex:
  // if (R.isNil(req.imei) || R.isEmpty(req.imei)) {...}

  //////////////////////////////////////////////////////////////////////////////////////////

  //
  //
  // const url = `xxxxxxx/pbb-001`
  // const r1 = R.endsWith('/pbb-001', url)
  // console.log("=====> r1: ", r1); // true
  //
  // const url2 = `xxxxxxx/pbb-001`
  // const r2 = R.endsWith('/pbb-002', url2)
  // console.log("=====> r1: ", r2); // false


  //////////////////////////////////////////////////////////////////////////////////////////
  // const boxIds = [1,2,3,4,1,2,5,6]
  // const chunkSize= 2
  // const chunkedBoxIds = R.splitEvery(Math.max(1, chunkSize), R.uniq(boxIds))
  // console.log("=====> chunkedBoxIds: ", chunkedBoxIds);
  // [1,2,3,4,1,2,5,6] => [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
  // 兩個一組變成一個 array
  // R.uniq 順便去重


  //////////////////////////////////////////////////////////////////////////////////////////

  // // @ts-ignore
  // let a2 = R.pluck("val", {
  //   a: {val: 3},
  //   b: {val: 5}
  // }); //=> {a: 3, b: 5}
  //
  // let a3 = R.pluck("val2", [
  //   {val2: 3, name: '22'},
  //   {val2: 5, name: '33'}
  // ]);
  // console.log("=====> a3: ", a3); //=> [ 3, 5 ]
  //
  // let a4 = R.pluck("name", [
  //   {val2: 3, name: '22'},
  //   {val2: 5, name: '33'}
  // ]);
  // console.log("=====> a4: ", a4); //=> [ '22', '33' ]
  // 可以直接把 array of object 中的
  // 那個 object 中的某個特定的 prop 的值 撈出來
  // 然後放到一個 arr 中
  //

  //////////////////////////////////////////////////////////////////////////////////////////

  // const recordA = {
  //   a: 12,
  //   b: 22,
  //   c: 33
  // }
  // let res = R.pick(['a', 'b'], recordA)
  // console.log('=====> res: ', res)
  //  { a: 12, b: 22 }
  // 撈出 obj 中的幾個屬性



  //////////////////////////////////////////////////////////////////////////////////////////


  // 返回給定 type 的清空 狀態
  // R.empty([1, 2, 3]);              //=> []
  // R.empty('unicorns');             //=> ''
  // R.empty({x: 1, y: 2});           //=> {}


  //////////////////////////////////////////////////////////////////////////////////////////

  // compose


  // const sayHi = (name: string) => `hi ${name}`
  // const sayUpperHi = R.compose(R.toUpper, sayHi);

  // let a1 = sayUpperHi("Ben");
  // console.log("a1", a1);   // => HI BEN

  // 就是 compose, 可以把很多 fn 組起來




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
