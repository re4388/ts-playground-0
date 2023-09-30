import { LineReader } from '../lineReader'

function getPriFromChar(input: string | undefined) {
  if(input === undefined) return 0

  if (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122) { // a~z
    return input.charCodeAt(0) - 96
  } else if (input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90) { // A~Z
    return input.charCodeAt(0) - 38
  } else {
    console.error('shall not happen')
    return 0
  }
}


function findCommonChar(s1: string, s2: string, s3: string) {
  for (const s1_ele of s1) {
    for (const s2_ele of s2) {
      for (const s3_ele of s3) {
        if(s1_ele===s2_ele && s2_ele === s3_ele) {
        // console.log("=====> s3_ele: ", s3_ele);
          return s3_ele
        }
      }
    }
  }
}



async function main() {

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)
    let score = 0

    let lineCount = 0
    let s1 = ''
    let s2 = ''
    let s3 = ''
    let char: string | undefined= ''
    for await (const line of lineReader.processFile()) {
      lineCount += 1

      // console.log(`Line ${line}`)
      // console.log('=====> lineCount: ', lineCount)

      // 三行三行的拿

      if (lineCount === 1) {
        s1 = line
      }
      if (lineCount === 2) {
        s2 = line
      }
      if (lineCount === 3) {
        s3 = line
      }




      if (lineCount % 3 === 0) {
        char = findCommonChar(s1, s2, s3)
        // console.log("=====> char: ", char);
        score += getPriFromChar(char)

        console.log(s1)
        console.log(s2)
        console.log(s3)


        s1 = ''
        s2 = ''
        s3 = ''
        lineCount = 0
      }

    }

    console.log('=====> score: ', score)

  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()

