import { ScooterOperation } from './interface/scooterOperation'

export class ScooterTypeA implements ScooterOperation {
  readonly plate: string;
  isActive = false

  constructor(plate: string) {
    this.plate = plate;
  }

  public setActive() {
    this.isActive = true
  }

  public setInactive() {
    this.isActive = false
  }
}

