function discount(input, qty) {
  if (input > 50) {
    input = input - 2
  }
  if (qty > 100) {
    input = input - 1
  }

  return input
}




// my try
function discount(input, qty) {
  let res = input
  if (input > 50) {
    res -= 2
  }
  if (qty > 100) {
    res -= 1
  }

  return res
}
