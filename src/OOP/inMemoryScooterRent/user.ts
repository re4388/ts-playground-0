import { Rent } from './rent'

export class User {
  private readonly name: string;
  private isActive: boolean = false

  constructor(name: string) {
    this.name = name;
  }

  public startRent(rent: Rent) {
    this.isActive = true
    rent.rentStart()
  }

  public finishRent(rent: Rent) {
    this.isActive = false
    rent.rentFinish()
  }
}
