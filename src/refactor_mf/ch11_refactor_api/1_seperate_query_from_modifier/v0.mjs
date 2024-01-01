
function modifySomething() {
  console.log('alarm!')
}


// query and modifier together
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === 'Don') {
      modifySomething()
      return 'Don'
    }
    if (p === 'John') {
      modifySomething()
      return 'John'
    }
  }
  return ''
}
// client
const found = alertForMiscreant(people);
