

let rows = 100
let cols = 100
// let rows = 15
// let cols = 15





const H_steps = [
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
]


// drawGUI()



export async function drawGUI() {
  // const [H_steps, T_steps] = await genArray()
  for (let i = 0; i < H_steps.length; i++) {
    // console.log(`step ${i}`)

    // runMatrix(H_steps[i], 'H')
    // runMatrix(T_steps[i], 'T')

    console.log('\n')
  }
}

export function runMatrix(H_pos: number[], symbol: string) {

  // let H_pos = [3, 2] // row, col
  let matrix = ''
  for (let r = 0; r < cols; r++) {
    matrix += `\n`
    for (let c = 0; c < rows; c++) {
      if (r === H_pos[0] && c === H_pos[1]) matrix += symbol
      else matrix += '.'
    }
  }
  console.log(matrix)
}













