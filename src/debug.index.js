const faker = require('faker');
const random = faker.random;


for (let i = 0; i < 10; i++) {
  // console.log(_faker.random.number({ max: 20, min: 10 }))
  console.log(random.number({ max: 1, min: 100 }))
  // let a1 = _faker.random.number().toString()
  // let a2 = _faker.random.arrayElement(['ALL3', 'ALL5'])

}
// console.log(_faker.random.image())
// console.log(_faker.random.arrayElement())
// console.log(_faker.random.boolean())s
// console.log(_faker.random.locale())
// console.log(_faker.random.objectElement())
// console.log(_faker.random.uuid())
// console.log(_faker.random.word())
// console.log(_faker.random.words())
// console.log(_faker.random.alphaNumeric())
// console.log(_faker.name.firstName())
