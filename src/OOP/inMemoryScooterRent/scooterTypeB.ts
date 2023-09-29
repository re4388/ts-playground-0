import { ScooterOperation } from './interface/scooterOperation'

export class ScooterTypeB implements ScooterOperation {
  readonly plate: string;
  isActive = false

  constructor(plate: string) {
    this.plate = plate;
  }

  public setActive() {
    console.log('ScooterTypeB setActive')
    this.isActive = true
  }

  public setInactive() {
    console.log('ScooterTypeB setInactive')
    this.isActive = false
  }
}

