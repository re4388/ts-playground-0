import * as _faker from 'faker'

export function run_facker() {

  for (let i = 0; i < 100; i++) {
    console.log(_faker.random.number({ max: 20, min: 10 }))

  }
  // console.log(_faker.random.image())
  // console.log(_faker.random.arrayElement())
  // console.log(_faker.random.boolean())
  // console.log(_faker.random.locale())
  // console.log(_faker.random.objectElement())
  // console.log(_faker.random.uuid())
  // console.log(_faker.random.word())
  // console.log(_faker.random.words())
  // console.log(_faker.random.alphaNumeric())
  // console.log(_faker.name.firstName())
}
