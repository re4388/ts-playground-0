/**
 * .....
 * .....
 * .....
 * .....
 * .....
 */


// let rows = 5
// let cols = 5
// let init = ''
//
//
// for (let c = 0; c < cols; c++) {
//   init += `\n`
//   for (let r = 0; r < rows; r++) {
//     init += '.'
//   }
// }
//
// console.log(init)


/**
 * .H...
 * .....
 * .....
 * .....
 * .....
 */

// let rows = 5
// let cols = 5
// let init = ''
// let H_pos = [0, 1]
//
//
// for (let r = 0; r < cols; r++) {
//   init += `\n`
//   for (let c = 0; c < rows; c++) {
//     if (r === H_pos[0] && c === H_pos[1]) init += 'H'
//     else init += '.'
//   }
// }
//
// console.log(init)


/**
 * .....
 * .....
 * .....
 * ..H..
 * .....
 */

// let rows = 5
// let cols = 5
// let init = ''
// let H_pos = [3, 2] // row, col
//
//
// for (let r = 0; r < cols; r++) {
//   init += `\n`
//   for (let c = 0; c < rows; c++) {
//     if (r === H_pos[0] && c === H_pos[1]) init += 'H'
//     else init += '.'
//   }
// }
//
// console.log(init)
//
//


/**
 * step 0
 * .....
 * .....
 * .....
 * ..H..
 * .....
 *
 * step 1
 *
 */

// let steps = 2
// let rows = 5
// let cols = 5
//
//
//
// // runMatrix()
// for (let s = 0; s < steps; s++) {
//   console.log(`step ${s}`)
//
//   runMatrix()
//
//   console.log('\n\n')
// }
//
// function runMatrix() {
//   let H_pos = [3, 2] // row, col
//   let matrix = ''
//   for (let r = 0; r < cols; r++) {
//     matrix += `\n`
//     for (let c = 0; c < rows; c++) {
//       if (r === H_pos[0] && c === H_pos[1]) matrix += 'H'
//       else matrix += '.'
//     }
//   }
//   console.log(matrix)
// }


////////////////////////////



let steps = 2
let rows = 5
let cols = 5
const H_steps = [[4, 0], [4, 1]]


// runMatrix()
for (let i = 0; i < H_steps.length; i++) {
  console.log(`step ${i}`)

  runMatrix(H_steps[i])

  console.log('\n')
}

function runMatrix(H_pos: number[]) {
  // let H_pos = [3, 2] // row, col
  let matrix = ''
  for (let r = 0; r < cols; r++) {
    matrix += `\n`
    for (let c = 0; c < rows; c++) {
      if (r === H_pos[0] && c === H_pos[1]) matrix += 'H'
      else matrix += '.'
    }
  }
  console.log(matrix)
}













