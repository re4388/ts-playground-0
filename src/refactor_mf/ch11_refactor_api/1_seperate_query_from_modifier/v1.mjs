
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

// copy 一個出來, 拿掉 modifier and rename to fit query
function findMiscreant(people) {
  for (const p of people) {
    if (p === 'Don') {
      return 'Don'
    }
    if (p === 'John') {
      return 'John'
    }
  }
  return ''
}


// client
// const found = alertForMiscreant(people);
const found = findMiscreant(people);
alertForMiscreant(people);
