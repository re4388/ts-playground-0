import { createReadStream } from 'node:fs'
import { createInterface } from 'readline/promises'
import { LineReader } from '../lineReader'


enum OpponentRockPaperScissors {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}


enum MyRockPaperScissors {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}


function calculateScoreForEachRound(opponent: OpponentRockPaperScissors, my: MyRockPaperScissors) {

  let totalScore = 0


  if (
    (opponent === OpponentRockPaperScissors.Rock && my === MyRockPaperScissors.Rock)
    ||
    (opponent === OpponentRockPaperScissors.Paper && my === MyRockPaperScissors.Paper)
    ||
    (opponent === OpponentRockPaperScissors.Scissors && my === MyRockPaperScissors.Scissors)
  ) {
    totalScore += 3
  }

  if (
    (opponent === OpponentRockPaperScissors.Rock && my === MyRockPaperScissors.Paper)
    ||
    (opponent === OpponentRockPaperScissors.Paper && my === MyRockPaperScissors.Scissors)
    ||
    (opponent === OpponentRockPaperScissors.Scissors && my === MyRockPaperScissors.Rock)
  ) {
    totalScore += 6
  }


  switch (my) {
    case MyRockPaperScissors.Rock: {
      totalScore += 1
      break
    }
    case MyRockPaperScissors.Paper: {
      totalScore += 2
      break
    }
    case MyRockPaperScissors.Scissors: {
      totalScore += 3
      break
    }
    default: {
      console.error('shall not shappen')
      break
    }
  }

  return totalScore
}


async function main() {

  try {
    const filePath = 'input.txt'
    const lineReader = new LineReader(filePath)
    let score = 0

    for await (const line of lineReader.processFile()) {
      console.log(`Line ${line}`)


      const opponentShape = line.split(' ')[0] as OpponentRockPaperScissors
      const myShape = line.split(' ')[1] as MyRockPaperScissors

      score += calculateScoreForEachRound(opponentShape, myShape)
    }
    console.log('=====> totalScore: ', score)


  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()
