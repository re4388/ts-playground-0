import { PaperOrScissorOrRock } from './main'


export enum GameResult {
  player1 = 'player1',
  player2 = 'player2',
  tie = 'tie',
}


export class Game_logic {
  public static check(choice1: PaperOrScissorOrRock, choice2: PaperOrScissorOrRock) {
    if (choice1 === choice2) return GameResult.tie

    if (
      choice1 === PaperOrScissorOrRock.Scissor && choice2 === PaperOrScissorOrRock.Paper
      ||
      choice1 === PaperOrScissorOrRock.Rock && choice2 === PaperOrScissorOrRock.Scissor
      ||
      choice1 === PaperOrScissorOrRock.Paper && choice2 === PaperOrScissorOrRock.Rock
    ) return GameResult.player1


    if (
      choice2 === PaperOrScissorOrRock.Scissor && choice1 === PaperOrScissorOrRock.Paper
      ||
      choice2 === PaperOrScissorOrRock.Rock && choice1 === PaperOrScissorOrRock.Scissor
      ||
      choice2 === PaperOrScissorOrRock.Paper && choice1 === PaperOrScissorOrRock.Rock
    ) return GameResult.player2
  }

}
