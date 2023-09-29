import { PaperOrScissorOrRock } from './main'
import { DefaultStgy } from './stgy/defaultStgy'

export class Player {
  private readonly name: string;
  private readonly stgy: DefaultStgy;

  constructor(name: string, stgy: DefaultStgy) {
    this.name = name;
    this.stgy = stgy
  }

  public useStgy(): PaperOrScissorOrRock {
    return this.stgy.useStgy()
  }
}
