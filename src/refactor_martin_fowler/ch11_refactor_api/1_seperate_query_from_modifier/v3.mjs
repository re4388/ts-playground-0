
function modifySomething() {
  console.log('alarm!')
}

// 用 findMiscreant 取代同樣的邏輯
function alertForMiscreant (people) {
  if (findMiscreant(people) !== "") {
    modifySomething();
  }
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
alertForMiscreant(found);
