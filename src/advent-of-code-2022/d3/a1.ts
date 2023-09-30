import { LineReader } from '../lineReader'

function getPriFromChar(input: string) {

  if (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122) { // a~z
    return input.charCodeAt(0) - 96
  } else if (input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90) { // A~Z
    return input.charCodeAt(0) - 38
  } else {
    console.error('shall not happen')
  }
}


function findCommonChar(s1: string, s2: string) {
  for (const s1_ele of s1) {
    for (const s2_ele of s2) {
      if (s1_ele === s2_ele) {
        console.log('=====> s1_ele: ', s1_ele)
        return s1_ele
      }
    }
  }
}

//
// findCommonChar(`vJrwpWtwJgWr`, `hcsFMMfFFhFp`)
// findCommonChar(`jqHRNqRjqzjGDLGL`, `rsFMfFZSrLrFZsSL`)
// findCommonChar(`PmmdzqPrV`, `vPwwTWBwg`)
// findCommonChar(`wMqvLMZHhHMvwLH`, `jbvcjnnSBnvTQFn`)
// findCommonChar(`ttgJtRGJ`, `QctTZtZT`)
// findCommonChar(`CrZsJsPPZsGz`, `wwsLwLmpwMDw`)


async function main() {

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)
    let score = 0


    for await (const line of lineReader.processFile()) {
      console.log(`Line ${line}`)

      let mid = Math.floor(line.length / 2)
      let firstHaf = line.slice(0, mid)
      console.log('=====> firstHaf: ', firstHaf)
      let secondHaf = line.slice(mid)
      console.log('=====> secondHaf: ', secondHaf)

      let char = findCommonChar(firstHaf, secondHaf)
      if (char === undefined) {
        console.error('no common char')
        return
      }


      // find common char
      score += getPriFromChar(char) as number

    }

    console.log("=====> score: ", score);

  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()

