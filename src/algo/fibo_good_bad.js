

/////////////// 1. good
// console.time('time');
// function fib (n) {
//   if ( n === 0 || n === 1) {
//     return n;
//   }
//
//   let a = 0;
//   let res = 1;
//   let temp = 0;
//
//   for (let i=2; i <= n; i++) {
//     temp = res;
//     res = a + res;
//     a = temp;
//   }
//   return res;
// }
//
// fib(45);
// console.timeEnd('time');



//////////////// 2. bad

// console.time('time');
//
// function fib (n) {
//   if ( n === 0 || n === 1) {
//     return n;
//   }
//   return fib(n-1) + fib(n-2);
// }
//
// fib(45);
// console.timeEnd('time');
// time: 9.877s


//////////// 3. dp with recusion
// console.time('time');
//
//
// let memo = {}
// function fib (n) {
//
//   if ( n === 0 || n === 1) {
//     return n;
//   }
//   if (n in memo) return memo[n]
//
//   let nextOne = fib(n-1) + fib(n-2);
//   memo[n]=nextOne
//   return memo[n]
// }
// fib(45);
// console.timeEnd('time');
// // time: 0.051ms





//
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${used} MB`);

