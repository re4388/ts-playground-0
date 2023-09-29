import { PaperOrScissorOrRock } from '../main'
import { DefaultStgy } from './defaultStgy'

export class RockStgy extends DefaultStgy{

  constructor() {
    super()
  }

  public useStgy(): PaperOrScissorOrRock {
    return PaperOrScissorOrRock.Rock
  }
}
