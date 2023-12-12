import avro from 'avsc'

// const type2 = avro.Type.forValue([1, 4.5, 8])
// console.log("=====> type2: ", type2);
// // We can now encode or any array of floats using this type:
//
//
// const buf = type2.toBuffer([4, 6.1])
// const val = type2.fromBuffer(buf) // [4, 6.1]
// console.log("=====> val: ", val);
//
//
// // We can also access the auto-generated schema:
// const schema2 = type2.schema()
// console.log('=====> schema2: ', schema2)
// // =====> schema:  { type: 'array', items: 'float' }



const type3 = avro.Type.forValue({
 name: 'ben',
  age: 30,
})
console.log("=====> type3: ", type3);
// We can now encode or any array of floats using this type:


const buf2 = type3.toBuffer({
  name: 'jack',
  age: 22
})

const val2 = type3.fromBuffer(buf2) // [4, 6.1]
console.log("=====> val2: ", val2);


// We can also access the auto-generated schema:
const a33 = type3.schema()
console.log('=====> a33: ', a33)
// =====> schema:  { type: 'array', items: 'float' }
