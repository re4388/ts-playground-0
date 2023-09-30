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
import { SpecialStack } from './specialStack'

// example stacks
// let s1 = new SpecialStack(['Z', 'N'])
// let s2 = new SpecialStack(['M', 'C', 'D'])
// let s3 = new SpecialStack(['P'])
// let s4 = new SpecialStack(['P'])
// let s5 = new SpecialStack(['P'])
// let s6 = new SpecialStack(['P'])
// let s7 = new SpecialStack(['P'])
// let s8 = new SpecialStack(['P'])
// let s9 = new SpecialStack(['P'])


// input stacks
let s1 = new SpecialStack(['S', 'C', 'V', 'N'])
let s2 = new SpecialStack(['Z', 'M', 'J', 'H', 'N', 'S'])
let s3 = new SpecialStack(['M', 'C', 'T', 'G', 'J', 'N', 'D'])
let s4 = new SpecialStack(['T', 'D', 'F', 'J', 'W', 'R', 'M'])
let s5 = new SpecialStack(['P', 'F', 'H'])
let s6 = new SpecialStack(['C', 'T', 'Z', 'H', 'J'])
let s7 = new SpecialStack(['D', 'P', 'R', 'Q', 'F', 'S', 'L', 'Z'])
let s8 = new SpecialStack(['C', 'S', 'L', 'H', 'D', 'F', 'P', 'W'])
let s9 = new SpecialStack(['D', 'S', 'M', 'P', 'F', 'N', 'G', 'Z'])

//

function chooseStack(input: number) {
  switch (input) {
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
      break
    }
  }
}


function moveCrate(qty: number, from: number, to: number) {
  let take = qty

  let fromStack = chooseStack(from) as SpecialStack
  let toStack = chooseStack(to) as SpecialStack

  toStack.push(fromStack.pop(take) as string[])

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


    console.log('=====> count: ', count)

    let res = ''
    res += s1.peak()
    res += s2.peak()
    res += s3.peak()
    res += s4.peak()
    res += s5.peak()
    res += s6.peak()
    res += s7.peak()
    res += s8.peak()
    res += s9.peak()
    console.log('=====> res: ', res)

  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()


