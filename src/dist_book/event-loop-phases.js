const fs = require('fs')

// checker queue
setImmediate(() => console.log(1))

// promise micro queue
Promise.resolve().then(() => console.log(2))

// microqueue
process.nextTick(() => console.log(3))


// io goes into poll queue
fs.readFile(__filename, () => {
  console.log(4)

  // timer queue
  setTimeout(() => console.log(5))

  // checker queue
  setImmediate(() => console.log(6))

  // microqueue
  process.nextTick(() => console.log(7))
})

console.log(8)

// order
// eventLoop phrase: poll ->    check     -> close ->           timer          -> pending
//                    IO    setImmediate                 timeout and interval
// each phrase check the micro-task first
// micro-task priority nextTick > promise

// order, my ans
// 8 -> 3 -> 2 -> 1 -> 4 -> 7 -> 6 -> 5
