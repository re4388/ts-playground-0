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


enum TargetResult {
  lose = 'X',
  draw = 'Y',
  win = 'Z',
}


function getMyShape(opponent: OpponentRockPaperScissors, res: TargetResult): MyRockPaperScissors {
  let myShape = MyRockPaperScissors.Scissors

  switch (res) {
    case TargetResult.draw: {
      switch (opponent) {
        case OpponentRockPaperScissors.Rock: {
          myShape = MyRockPaperScissors.Rock
          break
        }
        case OpponentRockPaperScissors.Paper: {
          myShape = MyRockPaperScissors.Paper
          break
        }
        case OpponentRockPaperScissors.Scissors: {
          myShape = MyRockPaperScissors.Scissors
          break
        }
        default: {
          console.error('shall not happen')
          break
        }
      }
      break
    }
    case TargetResult.lose: {
      switch (opponent) {
        case OpponentRockPaperScissors.Rock: {
          myShape = MyRockPaperScissors.Scissors
          break
        }
        case OpponentRockPaperScissors.Paper: {
          myShape = MyRockPaperScissors.Rock
          break
        }
        case OpponentRockPaperScissors.Scissors: {
          myShape = MyRockPaperScissors.Paper
          break
        }
        default: {
          console.error('shall not happen')
          break
        }
      }
      break
    }
    case TargetResult.win: {
      switch (opponent) {
        case OpponentRockPaperScissors.Rock: {
          myShape = MyRockPaperScissors.Paper
          break
        }
        case OpponentRockPaperScissors.Paper: {
          myShape = MyRockPaperScissors.Scissors
          break
        }
        case OpponentRockPaperScissors.Scissors: {
          myShape = MyRockPaperScissors.Rock
          break
        }
        default: {
          console.error('shall not happen')
          break
        }
      }
    }
    default: {
      console.error('shall not happen')
      break
    }
  }


  //
  //
  //
  //
  //
  //
  //
  // if (res === targetResult.lose) {
  //   switch (opponent) {
  //     case OpponentRockPaperScissors.Rock: {
  //       myShape = MyRockPaperScissors.Scissors
  //       break
  //     }
  //     case OpponentRockPaperScissors.Paper: {
  //       myShape = MyRockPaperScissors.Rock
  //       break
  //     }
  //     case OpponentRockPaperScissors.Scissors: {
  //       myShape = MyRockPaperScissors.Paper
  //       break
  //     }
  //     default: {
  //       console.error('shall not happen')
  //       break
  //     }
  //   }
  // }
  //
  // if (res === targetResult.draw) {
  //   switch (opponent) {
  //     case OpponentRockPaperScissors.Rock: {
  //       myShape = MyRockPaperScissors.Rock
  //       break
  //     }
  //     case OpponentRockPaperScissors.Paper: {
  //       myShape = MyRockPaperScissors.Paper
  //       break
  //     }
  //     case OpponentRockPaperScissors.Scissors: {
  //       myShape = MyRockPaperScissors.Scissors
  //       break
  //     }
  //     default: {
  //       console.error('shall not happen')
  //       break
  //     }
  //   }
  // }
  //
  // if (res === targetResult.win) {
  //   switch (opponent) {
  //     case OpponentRockPaperScissors.Rock: {
  //       myShape = MyRockPaperScissors.Paper
  //       break
  //     }
  //     case OpponentRockPaperScissors.Paper: {
  //       myShape = MyRockPaperScissors.Scissors
  //       break
  //     }
  //     case OpponentRockPaperScissors.Scissors: {
  //       myShape = MyRockPaperScissors.Rock
  //       break
  //     }
  //     default: {
  //       console.error('shall not happen')
  //       break
  //     }
  //   }
  // }

  return myShape
}


function calculateScoreForEachRoundV2(opponent: OpponentRockPaperScissors, res: TargetResult) {

  let totalScore = 0
  let my = getMyShape(opponent, res)


  switch (res) {
    case TargetResult.win: {
      totalScore += 6
      break
    }
    case TargetResult.draw: {
      totalScore += 3
      break
    }
    default: {
      console.error('shall not happen')
      break
    }
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
      const res = line.split(' ')[1] as TargetResult

      score += calculateScoreForEachRoundV2(opponentShape, res)
    }
    console.log('=====> totalScore: ', score)


  } catch (error) {
    console.log('catch error: ', error)

  }


}


main()
