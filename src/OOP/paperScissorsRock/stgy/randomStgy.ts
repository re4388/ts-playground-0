import { PaperOrScissorOrRock } from '../main'
import { DefaultStgy } from './defaultStgy'

export class RandomStgy extends DefaultStgy{

  constructor() {
    super()
  }

  public useStgy(): PaperOrScissorOrRock {
    let possible = [PaperOrScissorOrRock.Paper, PaperOrScissorOrRock.Scissor, PaperOrScissorOrRock.Rock]
    let idx = Math.floor(Math.random()*3)
    return possible[idx]
  }
}
