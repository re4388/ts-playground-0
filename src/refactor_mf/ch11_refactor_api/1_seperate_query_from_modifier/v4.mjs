function modifySomething() {
  console.log('alarm!')
}

// 用 findMiscreant 取代同樣的邏輯
function alertForMiscreant(people) {
  if (findMiscreant(people) !== '') {
    modifySomething()
  }
}

// 可以更進一步優化，改為 fp style
function findMiscreant(people) {
  return R.defaultTo('', people.find(p => ['Don', 'John'].includes(p)))
  // return R.defaultTo('', people.find(p => R.includes(p, ['Don', 'John']))
}

// client
// const found = alertForMiscreant(people);
const found = findMiscreant(people)
alertForMiscreant(found)



// R.includes(3, [1, 2, 3]); //=> true
