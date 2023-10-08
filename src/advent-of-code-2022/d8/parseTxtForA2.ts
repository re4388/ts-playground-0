import { LineReader } from '../lineReader'


export async function parse() {

  let res = []

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)


    for await (const line of lineReader.processFile()) {
      // console.log('=====> line: ', line)
      let l1 = line.split('')
      let numberList = l1.map(ele => Number(ele))
      // console.log("=====> l1: ", l1);
      res.push(numberList)

    }

    return res


  } catch (error) {
    console.log('catch error: ', error)

  }


}




// goal
// let grid = [
//   [3, 0, 3, 7, 3],
//   [2, 5, 5, 1, 2],
//   [6, 5, 3, 3, 2],
//   [3, 3, 5, 4, 9],
//   [3, 5, 3, 9, 0]
// ]
