import { parse } from './parseTxt'

// let grid = [
//   [3, 0, 3, 7, 3],
//   [2, 5, 5, 1, 2],
//   [6, 5, 3, 3, 2],
//   [3, 3, 5, 4, 9],
//   [3, 5, 3, 9, 0]
// ]


async function main() {


  let grid = await parse()

  if (grid === undefined) return


  // console.log(grid[1][1])
  let rows = grid.length
  let cols = grid[0].length

  let s1 = new Set()
  let s2 = new Set()

  // @ts-ignore
  function dfsROW(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return true
    }

    if (count > 0) {
      // @ts-ignore
      if (grid[r][c] >= initValue) return false
    }

    let key = r + ',' + c
    if (s1.has(key)) return false

    s1.add(key)

    return dfsROW(r + 1, c, initValue, count + 1) ||
      dfsROW(r - 1, c, initValue, count + 1)

  }

  // @ts-ignore
  function dfsCOL(r: number, c: number, initValue: number, count: number) {
    // console.log(`r: ${r}, c: ${c}`)


    if (r < 0 || c < 0 || r >= rows || c >= cols) {
      // console.log(` --   r: ${r}, c: ${c}`)
      return true
    }

    if (count > 0) {
      // @ts-ignore
      if (grid[r][c] >= initValue) return false
    }

    let key = r + ',' + c
    if (s2.has(key)) return false

    s2.add(key)

    return dfsCOL(r, c + 1, initValue, count + 1) ||
      dfsCOL(r, c - 1, initValue, count + 1)

  }

  let notVisible = []
  let visible = []


  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      s1.clear()
      s2.clear()

      if (
        // @ts-ignore
        dfsCOL(r, c, grid[r][c], 0) === false &&
        // @ts-ignore
        dfsROW(r, c, grid[r][c], 0) === false
      ) {
        notVisible.push([r, c])
      }

      s1.clear()
      s2.clear()

      if (
        // @ts-ignore
        dfsCOL(r, c, grid[r][c], 0) === true ||
        // @ts-ignore
        dfsROW(r, c, grid[r][c], 0) === true
      ) {
        visible.push([r, c])
      }

    }
  }

  console.log('rows', rows)
  console.log('cols', cols)

  const roundNumber = rows * 2 + (cols - 2) * 2
  console.log('round number: ', roundNumber)
  console.log('=====> notVisible: ', notVisible)
  console.log('=====> visible: ', visible)
  console.log(visible.length + roundNumber)


  // let res1 = dfsCOL(2, 3, grid[2][3], 0)
  // console.log("=====> res1: ", res1);

  // // check false
  // let falseTest= [[3,1],[1,3], [2,2],[3,3]]
  // for (const ele of falseTest) {
  //   let a1 = dfsCOL(ele[0], ele[1], grid[ele[0]][ele[1]], 0)
  //   console.log("=====> a1: ", a1);
  //   let a2 = dfsROW(ele[0], ele[1], grid[ele[0]][ele[1]], 0)
  //   console.log("=====> a2: ", a2);
  //   s1.clear()
  //   s2.clear()
  // }

  //
  // let correctTest= [[1,1],[1,2], [2,1], [3,2], [2,3]]
  // for (const ele of correctTest) {
  //   console.log('=====> ele[0]: ', ele[0])
  //   console.log('=====> ele[1]: ', ele[1])
  //   let a1 = dfsCOL(ele[0], ele[1], grid[ele[0]][ele[1]], 0)
  //   console.log("=====> a1: ", a1);
  //   let a2 = dfsROW(ele[0], ele[1], grid[ele[0]][ele[1]], 0)
  //   console.log("=====> a2: ", a2);
  //   console.log('=======================')
  //
  //   s1.clear()
  //   s2.clear()
  // }

//
// =====> notVisible:  [ [ 1, 3 ], [ 2, 2 ], [ 3, 1 ], [ 3, 3 ] ]
//   =====> visible:  [ [ 1, 1 ], [ 1, 2 ], [ 2, 1 ], [ 2, 3 ], [ 3, 2 ] ]

}


main()
