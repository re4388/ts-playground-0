/**
 *
 *     [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 *
 *
 *
 *                         [Z] [W] [Z]
 *         [D] [M]         [L] [P] [G]
 *     [S] [N] [R]         [S] [F] [N]
 *     [N] [J] [W]     [J] [F] [D] [F]
 * [N] [H] [G] [J]     [H] [Q] [H] [P]
 * [V] [J] [T] [F] [H] [Z] [R] [L] [M]
 * [C] [M] [C] [D] [F] [T] [P] [S] [S]
 * [S] [Z] [M] [T] [P] [C] [D] [C] [D]
 *  1   2   3   4   5   6   7   8   9
 */


import { LineReader } from '../lineReader'

// example stacks
// let s1 = ['Z', 'N']
// let s2 = ['M', 'C', 'D']
// let s3 = ['P']
// let s4 = ['P']
// let s5 = ['P']
// let s6 = ['P']
// let s7 = ['P']
// let s8 = ['P']
// let s9 = ['P']

// input stacks
let s1 = ['S', 'C', 'V', 'N']
let s2 = ['Z', 'M', 'J', 'H', 'N', 'S']
let s3 = ['M', 'C', 'T', 'G', 'J', 'N', 'D']
let s4 = ['T', 'D', 'F', 'J', 'W', 'R', 'M']
let s5 = ['P', 'F', 'H']
let s6 = ['C', 'T', 'Z', 'H', 'J']
let s7 = ['D', 'P', 'R', 'Q', 'F', 'S', 'L', 'Z']
let s8 = ['C', 'S', 'L', 'H', 'D', 'F', 'P', 'W']
let s9 = ['D', 'S', 'M', 'P', 'F', 'N', 'G', 'Z']


function chooseStack(input: number) {
  switch(input) {
     case 1: {
        return s1
     }
     case 2: {
       return s2
     }
    case 3: {
      return s3
    }
    case 4: {
      return s4
    }
    case 5: {
      return s5
    }
    case 6: {
      return s6
    }
    case 7: {
      return s7
    }
    case 8: {
      return s8
    }
    case 9: {
      return s9
    }
    default: {
      console.error('shall not happen')
        break;
     }
  }
}


function moveCrate(qty: number, from: number, to: number) {
  let count = qty
  while (count>0){

    let fromStack = chooseStack(from) as string[]
    let toStack = chooseStack(to) as string[]

    toStack.push(fromStack.pop() as string)

    count = count -1
  }
}


async function main() {

  try {
    const filePath = 'a2.txt'
    const lineReader = new LineReader(filePath)
    let count = 0


    for await (const line of lineReader.processFile()) {
      console.log(`Line ${line}`)
      const a1 = line.split(' ')
      let qty = a1[1]
      let from = a1[3]
      let to = a1[5]
      moveCrate(Number(qty), Number(from), Number(to))
    }

    // console.log(s1)
    // console.log(s2)
    // console.log(s3)



    console.log("=====> count: ", count);

    let res = ''
    res += s1.pop()
    res += s2.pop()
    res += s3.pop()
    res += s4.pop()
    res += s5.pop()
    res += s6.pop()
    res += s7.pop()
    res += s8.pop()
    res += s9.pop()
    console.log("=====> res: ", res);

  } catch (error) {
    console.log('catch error: ', error)

  }




}


main()


