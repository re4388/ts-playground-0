import { Player } from './player'
import { Game } from './game'
import { RockStgy } from './stgy/RockStgy'
import { RandomStgy } from './stgy/randomStgy'

export enum PaperOrScissorOrRock {
  Paper = 'Paper',
  Rock = 'Rock',
  Scissor = 'Scissor'
}


let ben = new Player('ben', new RockStgy())
let jack = new Player('jack', new RandomStgy())


let game = new Game(ben, jack)
let result = game.start()
console.log("=====> result: ", result);
