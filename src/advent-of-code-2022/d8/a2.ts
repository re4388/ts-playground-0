import { parse } from './parseTxtForA2'

// let grid = [
//   [3, 0, 3, 7, 3],
//   [2, 5, 5, 1, 2],
//   [6, 5, 3, 3, 2],
//   [3, 3, 5, 4, 9],
//   [3, 5, 3, 9, 0]
// ]


async function main() {
  let score: number[] = []
  let grid = await parse()

  if (grid === undefined) return


  // console.log(grid[1][1])
  let rows = grid.length
  let cols = grid[0].length

  let s1 = new Set()
  let s2 = new Set()

  // @ts-ignore
  function dfsGoRight(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return 0
    }

    if (count > 0) {
      // @ts-ignore
      if (grid[r][c] > initValue) return 1
      // @ts-ignore
      // console.log("=====> grid[r][c]: ", grid[r][c]);
      // console.log("=====> initValue: ", initValue);
      if (grid[r][c] === initValue) {
        // console.log("QQ2", initValue);
        return 1
      }
    }

    let key = r + ',' + c
    if (s1.has(key)) return false

    s1.add(key)

    return dfsGoRight(r, c + 1, initValue, count + 1) + 1

  }


  // @ts-ignore
  function dfsGoLeft(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return 0
    }

    if (count > 0) {
      // @ts-ignore
      if (Number(grid[r][c]) > initValue) return 1
      // @ts-ignore
      // console.log("=====> grid[r][c]: ", grid[r][c]);
      // console.log("=====> initValue: ", initValue);
      // @ts-ignore
      if (Number(grid[r][c]) === initValue) {
        // console.log("QQ2", initValue);
        return 1
      }
    }

    let key = r + ',' + c
    if (s1.has(key)) return false

    s1.add(key)

    return dfsGoLeft(r, c - 1, initValue, count + 1) + 1

  }


  // @ts-ignore
  function dfsGoUp(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return 0
    }

    if (count > 0) {
      // @ts-ignore
      if (Number(grid[r][c]) > initValue) return 1
      // @ts-ignore
      // console.log("=====> grid[r][c]: ", grid[r][c]);
      // console.log("=====> initValue: ", initValue);
      // @ts-ignore
      if (Number(grid[r][c]) === initValue) {
        // console.log("QQ2", initValue);
        return 1
      }
    }

    let key = r + ',' + c
    if (s1.has(key)) return false

    s1.add(key)

    return dfsGoUp(r - 1, c, initValue, count + 1) + 1

  }


  // @ts-ignore
  function dfsGoDown(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return 0
    }

    if (count > 0) {
      // @ts-ignore
      if (Number(grid[r][c]) > initValue) return 1
      // @ts-ignore
      // console.log("=====> grid[r][c]: ", grid[r][c]);
      // console.log("=====> initValue: ", initValue);
      // @ts-ignore
      if (Number(grid[r][c]) === initValue) {
        // console.log("QQ2", initValue);
        return 1
      }
    }

    let key = r + ',' + c
    if (s1.has(key)) return false

    s1.add(key)

    return dfsGoDown(r + 1, c, initValue, count + 1) + 1

  }


  // let a1 = dfsGoDown(1, 2, 5, 0) - 1
  // console.log("=====> a1: ", a1);
  // s1.clear()
  // s2.clear()
  // let a2 = dfsGoUp(1, 2, 5, 0) - 1
  // console.log("=====> a2: ", a2);
  // s1.clear()
  // s2.clear()
  // let a3 = dfsGoLeft(1, 2, 5, 0) - 1
  // console.log("=====> a3: ", a3)
  // s1.clear()
  // s2.clear()
  // let a4 = dfsGoRight(1, 2, 5, 0) - 1
  // console.log("=====> a4: ", a4)
  // s1.clear()
  // s2.clear()

  // let a1 = dfsGoDown(3, 2, 5, 0) - 1
  // console.log("=====> a1: ", a1);
  // s1.clear()
  // s2.clear()
  // let a2 = dfsGoUp(3, 2, 5, 0) - 1
  // console.log("=====> a2: ", a2);
  // s1.clear()
  // s2.clear()
  // let a3 = dfsGoLeft(3, 2, 5, 0) - 1
  // console.log("=====> a3: ", a3)
  // s1.clear()
  // s2.clear()
  // let a4 = dfsGoRight(3, 2, 5, 0) - 1
  // console.log("=====> a4: ", a4)
  // s1.clear()
  // s2.clear()

  // let notVisible = []
  // let visible = []


  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      // console.log(`r: ${r}, c: ${c}`)
      s1.clear()
      s2.clear()
      let down = dfsGoDown(r, c, grid[r][c], 0) - 1
      s1.clear()
      s2.clear()
      let up = dfsGoUp(r, c, grid[r][c], 0) - 1
      s1.clear()
      s2.clear()
      let left = dfsGoLeft(r, c, grid[r][c], 0) - 1
      s1.clear()
      s2.clear()
      let right = dfsGoRight(r, c, grid[r][c], 0) - 1
      s1.clear()
      s2.clear()
      // console.log(`up ${up}, down ${down}, left ${left}, right ${right}`)
      score.push(down * up * left * right)
    }
  }

  console.log(score)
  console.log(Math.max(...score))

}


main()
