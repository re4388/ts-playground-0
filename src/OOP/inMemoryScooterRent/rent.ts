import { ScooterTypeA } from './scooterTypeA'
import { ScooterOperation } from './interface/scooterOperation'

export class Rent {
  private readonly ratePerSec= 10
  private readonly scooter: ScooterTypeA
  private startTime: number | undefined
  private endTime: number | undefined

  constructor(scooter: ScooterOperation) { // <-- depend on 抽象
    this.scooter = scooter
  }

  public rentStart() {
    this.scooter.setActive()
    this.startTime = new Date().getTime()


  }

  public rentFinish() {
    this.scooter.setInactive()
    this.endTime = new Date().getTime()
  }

  public getRentPeriodInMs(): number {
    if (this.endTime !== undefined && this.startTime !== undefined) {
      return this.endTime - this.startTime
    } else {
      throw new Error('only can call this when rent is finished')
    }
  }

  public getRentFee(): number {
    return (Math.floor(this.getRentPeriodInMs() / 1000)) * this.ratePerSec
  }
}

