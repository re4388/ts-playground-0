import { Player } from './player'
import { Game_logic } from './game_logic'
import { PaperOrScissorOrRock } from './main'


export class Game {
  private readonly player1: Player
  private readonly player2: Player

  constructor(player1: Player, player2: Player) {
    this.player1 = player1
    this.player2 = player2
  }

  public start() {
    return this.checkResult(this.player1.useStgy(), this.player2.useStgy())
  }

  private checkResult(play1_chosen: PaperOrScissorOrRock, play2_chosen: PaperOrScissorOrRock) {
    console.log("=====> play1_chosen: ", play1_chosen);
    console.log("=====> play2_chosen: ", play2_chosen);
    return Game_logic.check(play1_chosen, play2_chosen)
  }
}
