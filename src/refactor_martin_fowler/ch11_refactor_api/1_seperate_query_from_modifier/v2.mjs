
function modifySomething() {
  console.log('alarm!')
}


// 把 modifier 拿掉 query 部分
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === 'Don') {
      modifySomething()
      return
    }
    if (p === 'John') {
      modifySomething()
      return
    }
  }
  return
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
