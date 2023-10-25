import { LineReader } from '../lineReader'
import { runMatrix } from './v2'


function checkIf_num_NeedToMove(num_pos: number[], h_pos: number[]) {
  let x = num_pos[0]
  let y = num_pos[1]
  let nine_cells = [
    [x, y],
    [x + 1, y], [x - 1, y],
    [x, y + 1], [x, y - 1],
    [x + 1, y + 1], [x - 1, y - 1],
    [x + 1, y - 1], [x - 1, y + 1]
  ]

  for (let i = 0; i < nine_cells.length; i++) {
    if (JSON.stringify(nine_cells[i]) === JSON.stringify(h_pos)) {
      console.log('no need to move')
      return 'no move' // no move
    }
  }


  console.log('move to last h pos')
  return 'last_h_pos'
}

const H_move_arr = [[4, 0]]
const move_1_arr = [[4, 0]]
const move_2_arr = [[4, 0]]
const move_3_arr = [[4, 0]]
const move_4_arr = [[4, 0]]
const move_5_arr = [[4, 0]]
const move_6_arr = [[4, 0]]
const move_7_arr = [[4, 0]]
const move_8_arr = [[4, 0]]
const move_9_arr = [[4, 0]]


export async function genArray() {


  let move = 1
  let last_h_move = []

  try {
    const filePath = 'a1.txt'
    const lineReader = new LineReader(filePath)

    for await (const line of lineReader.processFile()) {
      console.log(`=== ${line} ===`)

      let [dir, moves] = line.split(' ')


      for (let i = 0; i < Number(moves); i++) {

        /**
         * R 4 -> col+4
         * U 4 -> row-4
         * L 3 -> col-4
         * D 1 -> row+1
         */
        let last_H_Pos = H_move_arr[H_move_arr.length - 1]
        let last_1_Pos = move_1_arr[move_1_arr.length - 1]
        let last_2_Pos = move_2_arr[move_2_arr.length - 1]
        let last_3_Pos = move_3_arr[move_3_arr.length - 1]
        let last_4_Pos = move_4_arr[move_4_arr.length - 1]
        let last_5_Pos = move_5_arr[move_5_arr.length - 1]
        let last_6_Pos = move_6_arr[move_6_arr.length - 1]
        let last_7_Pos = move_7_arr[move_7_arr.length - 1]
        let last_8_Pos = move_8_arr[move_8_arr.length - 1]
        let last_9_Pos = move_9_arr[move_9_arr.length - 1]

        switch (dir) {
          case `R`: {
            let newPos = last_H_Pos[1] + 1
            let h_move = [last_H_Pos[0], newPos]
            H_move_arr.push(h_move)

            // 1
            let move_1_decision = checkIf_num_NeedToMove(last_1_Pos, h_move)
            let num_1_move
            if (move_1_decision === 'no move') {
              num_1_move = last_1_Pos
            } else {
              num_1_move = last_H_Pos
            }
            move_1_arr.push(num_1_move)

            // 2
            let move_2_decision = checkIf_num_NeedToMove(last_2_Pos, num_1_move)
            let num_2_move
            if (move_2_decision === 'no move') {
              num_2_move = last_2_Pos
            } else {
              num_2_move = last_1_Pos
            }
            move_2_arr.push(num_2_move)

            // 3
            let move_3_decision = checkIf_num_NeedToMove(last_3_Pos, num_2_move)
            let num_3_move
            if (move_3_decision === 'no move') {
              num_3_move = last_3_Pos
            } else {
              num_3_move = last_2_Pos
            }
            move_3_arr.push(num_3_move)

            // 4
            let move_4_decision = checkIf_num_NeedToMove(last_4_Pos, num_3_move)
            let num_4_move
            if (move_4_decision === 'no move') {
              num_4_move = last_4_Pos
            } else {
              num_4_move = last_3_Pos
            }
            move_4_arr.push(num_4_move)

            // 5
            let move_5_decision = checkIf_num_NeedToMove(last_5_Pos, num_4_move)
            let num_5_move
            if (move_5_decision === 'no move') {
              num_5_move = last_5_Pos
            } else {
              num_5_move = last_4_Pos
            }
            move_5_arr.push(num_5_move)
            // 6
            let move_6_decision = checkIf_num_NeedToMove(last_6_Pos, num_5_move)
            let num_6_move
            if (move_6_decision === 'no move') {
              num_6_move = last_6_Pos
            } else {
              num_6_move = last_5_Pos
            }
            move_6_arr.push(num_6_move)
            // 7
            let move_7_decision = checkIf_num_NeedToMove(last_7_Pos, num_6_move)
            let num_7_move
            if (move_7_decision === 'no move') {
              num_7_move = last_7_Pos
            } else {
              num_7_move = last_6_Pos
            }
            move_7_arr.push(num_7_move)
            // 8
            let move_8_decision = checkIf_num_NeedToMove(last_8_Pos, num_7_move)
            let num_8_move
            if (move_8_decision === 'no move') {
              num_8_move = last_8_Pos
            } else {
              num_8_move = last_7_Pos
            }
            move_8_arr.push(num_8_move)
            // 9
            let move_9_decision = checkIf_num_NeedToMove(last_9_Pos, num_8_move)
            let num_9_move
            if (move_9_decision === 'no move') {
              num_9_move = last_9_Pos
            } else {
              num_9_move = last_8_Pos
            }
            move_9_arr.push(num_9_move)


            break
          }
          case 'U': {
            let newPos = last_H_Pos[0] - 1
            let h_move = [newPos, last_H_Pos[1]]
            H_move_arr.push([newPos, last_H_Pos[1]])

            let move_1_decision = checkIf_num_NeedToMove(last_1_Pos, h_move)
            let num_1_move
            if (move_1_decision === 'no move') {
              num_1_move = last_1_Pos
            } else {
              num_1_move = last_H_Pos
            }
            move_1_arr.push(num_1_move)

            // 2
            let move_2_decision = checkIf_num_NeedToMove(last_2_Pos, num_1_move)
            let num_2_move
            if (move_2_decision === 'no move') {
              num_2_move = last_2_Pos
            } else {
              num_2_move = last_1_Pos
            }
            move_2_arr.push(num_2_move)

            // 3
            let move_3_decision = checkIf_num_NeedToMove(last_3_Pos, num_2_move)
            let num_3_move
            if (move_3_decision === 'no move') {
              num_3_move = last_3_Pos
            } else {
              num_3_move = last_2_Pos
            }
            move_3_arr.push(num_3_move)

            // 4
            let move_4_decision = checkIf_num_NeedToMove(last_4_Pos, num_3_move)
            let num_4_move
            if (move_4_decision === 'no move') {
              num_4_move = last_4_Pos
            } else {
              num_4_move = last_3_Pos
            }
            move_4_arr.push(num_4_move)

            // 5
            let move_5_decision = checkIf_num_NeedToMove(last_5_Pos, num_4_move)
            let num_5_move
            if (move_5_decision === 'no move') {
              num_5_move = last_5_Pos
            } else {
              num_5_move = last_4_Pos
            }
            move_5_arr.push(num_5_move)
            // 6
            let move_6_decision = checkIf_num_NeedToMove(last_6_Pos, num_5_move)
            let num_6_move
            if (move_6_decision === 'no move') {
              num_6_move = last_6_Pos
            } else {
              num_6_move = last_5_Pos
            }
            move_6_arr.push(num_6_move)
            // 7
            let move_7_decision = checkIf_num_NeedToMove(last_7_Pos, num_6_move)
            let num_7_move
            if (move_7_decision === 'no move') {
              num_7_move = last_7_Pos
            } else {
              num_7_move = last_6_Pos
            }
            move_7_arr.push(num_7_move)
            // 8
            let move_8_decision = checkIf_num_NeedToMove(last_8_Pos, num_7_move)
            let num_8_move
            if (move_8_decision === 'no move') {
              num_8_move = last_8_Pos
            } else {
              num_8_move = last_7_Pos
            }
            move_8_arr.push(num_8_move)
            // 9
            let move_9_decision = checkIf_num_NeedToMove(last_9_Pos, num_8_move)
            let num_9_move
            if (move_9_decision === 'no move') {
              num_9_move = last_9_Pos
            } else {
              num_9_move = last_8_Pos
            }
            move_9_arr.push(num_9_move)

            break
          }
          case 'L': {
            let newPos = last_H_Pos[1] - 1
            let h_move = [last_H_Pos[0], newPos]
            H_move_arr.push(h_move)

            let move_1_decision = checkIf_num_NeedToMove(last_1_Pos, h_move)
            let num_1_move
            if (move_1_decision === 'no move') {
              num_1_move = last_1_Pos
            } else {
              num_1_move = last_H_Pos
            }
            move_1_arr.push(num_1_move)

            // 2
            let move_2_decision = checkIf_num_NeedToMove(last_2_Pos, num_1_move)
            let num_2_move
            if (move_2_decision === 'no move') {
              num_2_move = last_2_Pos
            } else {
              num_2_move = last_1_Pos
            }
            move_2_arr.push(num_2_move)

            // 3
            let move_3_decision = checkIf_num_NeedToMove(last_3_Pos, num_2_move)
            let num_3_move
            if (move_3_decision === 'no move') {
              num_3_move = last_3_Pos
            } else {
              num_3_move = last_2_Pos
            }
            move_3_arr.push(num_3_move)

            // 4
            let move_4_decision = checkIf_num_NeedToMove(last_4_Pos, num_3_move)
            let num_4_move
            if (move_4_decision === 'no move') {
              num_4_move = last_4_Pos
            } else {
              num_4_move = last_3_Pos
            }
            move_4_arr.push(num_4_move)

            // 5
            let move_5_decision = checkIf_num_NeedToMove(last_5_Pos, num_4_move)
            let num_5_move
            if (move_5_decision === 'no move') {
              num_5_move = last_5_Pos
            } else {
              num_5_move = last_4_Pos
            }
            move_5_arr.push(num_5_move)
            // 6
            let move_6_decision = checkIf_num_NeedToMove(last_6_Pos, num_5_move)
            let num_6_move
            if (move_6_decision === 'no move') {
              num_6_move = last_6_Pos
            } else {
              num_6_move = last_5_Pos
            }
            move_6_arr.push(num_6_move)
            // 7
            let move_7_decision = checkIf_num_NeedToMove(last_7_Pos, num_6_move)
            let num_7_move
            if (move_7_decision === 'no move') {
              num_7_move = last_7_Pos
            } else {
              num_7_move = last_6_Pos
            }
            move_7_arr.push(num_7_move)
            // 8
            let move_8_decision = checkIf_num_NeedToMove(last_8_Pos, num_7_move)
            let num_8_move
            if (move_8_decision === 'no move') {
              num_8_move = last_8_Pos
            } else {
              num_8_move = last_7_Pos
            }
            move_8_arr.push(num_8_move)
            // 9
            let move_9_decision = checkIf_num_NeedToMove(last_9_Pos, num_8_move)
            let num_9_move
            if (move_9_decision === 'no move') {
              num_9_move = last_9_Pos
            } else {
              num_9_move = last_8_Pos
            }
            move_9_arr.push(num_9_move)
            break
          }
          case 'D': {
            let newPos = last_H_Pos[0] + 1
            let h_move = [newPos, last_H_Pos[1]]
            H_move_arr.push(h_move)

            let move_1_decision = checkIf_num_NeedToMove(last_1_Pos, h_move)
            let num_1_move
            if (move_1_decision === 'no move') {
              num_1_move = last_1_Pos
            } else {
              num_1_move = last_H_Pos
            }
            move_1_arr.push(num_1_move)

            // 2
            let move_2_decision = checkIf_num_NeedToMove(last_2_Pos, num_1_move)
            let num_2_move
            if (move_2_decision === 'no move') {
              num_2_move = last_2_Pos
            } else {
              num_2_move = last_1_Pos
            }
            move_2_arr.push(num_2_move)

            // 3
            let move_3_decision = checkIf_num_NeedToMove(last_3_Pos, num_2_move)
            let num_3_move
            if (move_3_decision === 'no move') {
              num_3_move = last_3_Pos
            } else {
              num_3_move = last_2_Pos
            }
            move_3_arr.push(num_3_move)

            // 4
            let move_4_decision = checkIf_num_NeedToMove(last_4_Pos, num_3_move)
            let num_4_move
            if (move_4_decision === 'no move') {
              num_4_move = last_4_Pos
            } else {
              num_4_move = last_3_Pos
            }
            move_4_arr.push(num_4_move)

            // 5
            let move_5_decision = checkIf_num_NeedToMove(last_5_Pos, num_4_move)
            let num_5_move
            if (move_5_decision === 'no move') {
              num_5_move = last_5_Pos
            } else {
              num_5_move = last_4_Pos
            }
            move_5_arr.push(num_5_move)
            // 6
            let move_6_decision = checkIf_num_NeedToMove(last_6_Pos, num_5_move)
            let num_6_move
            if (move_6_decision === 'no move') {
              num_6_move = last_6_Pos
            } else {
              num_6_move = last_5_Pos
            }
            move_6_arr.push(num_6_move)
            // 7
            let move_7_decision = checkIf_num_NeedToMove(last_7_Pos, num_6_move)
            let num_7_move
            if (move_7_decision === 'no move') {
              num_7_move = last_7_Pos
            } else {
              num_7_move = last_6_Pos
            }
            move_7_arr.push(num_7_move)
            // 8
            let move_8_decision = checkIf_num_NeedToMove(last_8_Pos, num_7_move)
            let num_8_move
            if (move_8_decision === 'no move') {
              num_8_move = last_8_Pos
            } else {
              num_8_move = last_7_Pos
            }
            move_8_arr.push(num_8_move)
            // 9
            let move_9_decision = checkIf_num_NeedToMove(last_9_Pos, num_8_move)
            let num_9_move
            if (move_9_decision === 'no move') {
              num_9_move = last_9_Pos
            } else {
              num_9_move = last_8_Pos
            }
            move_9_arr.push(num_9_move)
            break
          }
          default: {
            console.log('shall not happened')
            break
          }
        }


        //
        // runMatrix(H_move_arr[move], 'H')
        // runMatrix(move_1_arr[move], '1')
        // move += 1

      }

      // move += Number(moves)

    }


  } catch (error) {
    console.log('catch error: ', error)
  }

  // return [H_move_arr, T_move_arr]

}

async function main() {
  await genArray()


  console.log(move_9_arr)

  let res = []
  for (let i = 0; i < move_9_arr.length; i++) {
    let ele = move_9_arr[i]
    res.push(`${ele[0]}-${ele[1]}`)
  }
  // console.log('=====> res: ', res)
  let s1 = new Set([...res])
  console.log('res: ', s1.size)
}


main()



