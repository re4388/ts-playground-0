import { PaperOrScissorOrRock } from '../main'




export abstract class DefaultStgy {

  protected constructor() {
  }

  public useStgy(): PaperOrScissorOrRock {
    throw new Error('not implement')
  }
}
