import { LineReader } from '../lineReader'
import { runMatrix } from './v2'


function checkIf_T_NeedToMove(t_pos: number[], h_pos: number[]) {
  let x = t_pos[0]
  let y = t_pos[1]
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

export async function genArray() {

  const H_move_arr = [[4, 0]]
  const T_move_arr = [[4, 0]]
  let move = 1
  let last_h_move = []

  try {
    const filePath = 'a2.txt'
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
        let last_T_Pos = T_move_arr[T_move_arr.length - 1]

        switch (dir) {
          case `R`: {
            let newPos = last_H_Pos[1] + 1
            let h_move = [last_H_Pos[0], newPos]
            H_move_arr.push(h_move)

            // t 下一步移動到 h 這一步的位置
            let t_move_decision = checkIf_T_NeedToMove(last_T_Pos, h_move)
            if (t_move_decision === 'no move') {
              T_move_arr.push(last_T_Pos)
            } else {
              T_move_arr.push(last_H_Pos)
            }


            break
          }
          case `U`: {
            let newPos = last_H_Pos[0] - 1
            let h_move = [newPos, last_H_Pos[1]]
            H_move_arr.push([newPos, last_H_Pos[1]])

            let t_move_decision = checkIf_T_NeedToMove(last_T_Pos, h_move)
            if (t_move_decision === 'no move') {
              T_move_arr.push(last_T_Pos)
            } else {
              T_move_arr.push(last_H_Pos)
            }
            break
          }
          case "L": {
            let newPos = last_H_Pos[1] - 1
            let h_move = [last_H_Pos[0], newPos]
            H_move_arr.push(h_move)

            let t_move_decision = checkIf_T_NeedToMove(last_T_Pos, h_move)
            if (t_move_decision === 'no move') {
              T_move_arr.push(last_T_Pos)
            } else {
              T_move_arr.push(last_H_Pos)
            }
            break
          }
          case "D": {
            let newPos = last_H_Pos[0] + 1
            let h_move = [newPos, last_H_Pos[1]]
            H_move_arr.push(h_move)

            let t_move_decision = checkIf_T_NeedToMove(last_T_Pos, h_move)
            if (t_move_decision === 'no move') {
              T_move_arr.push(last_T_Pos)
            } else {
              T_move_arr.push(last_H_Pos)
            }
            break
          }
          default: {
            console.log('shall not happened')
            break
          }
        }




        runMatrix(H_move_arr[move], 'H')
        runMatrix(T_move_arr[move], 'T')

        move +=1

      }

      // move += Number(moves)

    }

    console.log(T_move_arr)

    let res = []
    for (let i = 0; i < T_move_arr.length ;i++) {
      let ele = T_move_arr[i]
      res.push(`${ele[0]}-${ele[1]}`)
    }

    console.log("=====> res: ", res);
    let s1 = new Set([...res])
    console.log('res: ', s1.size)

  } catch (error) {
    console.log('catch error: ', error)
  }


  // console.log(H_move_arr)
  // return H_move_arr
  // return [H_move_arr, T_move_arr]

}


genArray()


