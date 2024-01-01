function discount(input, qty) {
  let res = input;
  if (input > 50) {
    res = res - 2
  }
  if (qty > 100) {
    res = res - 1
  }

  return res
}






// 下面可以證明 JavaScript has call-by-value parameters, any modification of inputValue isn’t seen by the caller

// function discount(input, qty) {
//   if (input > 50) {
//     input = input - 2
//   }
//   if (qty > 100) {
//     input = input - 1
//   }
//
//   input
//   return input
// }
//
//
// let a1 = 100
// let res = discount(a1, 20)
// console.log("res", res); // 98
// console.log(a1); // 100 不會被 mutate 到
