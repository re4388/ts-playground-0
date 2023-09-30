import { LineReader } from '../lineReader'



function checkIfAisSubSetOfB(a: number[], b: number[]) {
  return a.every( ele => b.includes(ele))
}

function hasIntersection(arr1: number[], arr2: number[]) {
  return arr1.some(element => arr2.includes(element));
}



async function main() {

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)
    let count = 0


    for await (const line of lineReader.processFile()) {
      console.log(`Line ${line}`)

      const sec1 = line.split(',')[0]
      const sec1_begin = sec1.split('-')[0]
      const sec1_end = sec1.split('-')[1]
      let sec1List = []
      for (let i = Number(sec1_begin); i <= Number(sec1_end); i++) {
        sec1List.push(i)
      }


      const sec2 = line.split(',')[1]
      const sec2_begin = sec2.split('-')[0]
      const sec2_end = sec2.split('-')[1]
      let sec2List = []
      for (let i = Number(sec2_begin); i <= Number(sec2_end); i++) {
        sec2List.push(i)
      }

      // check if sec1List include in sec2List and vice-versa

      if(checkIfAisSubSetOfB(sec1List, sec2List) || checkIfAisSubSetOfB(sec2List, sec1List)){
        count++
      }



    }

    console.log("=====> count: ", count);

  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()

