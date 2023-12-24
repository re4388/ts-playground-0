import assert from 'node:assert'

class ProductionPlan {
  get production() {
    // my hypothesis is that I can just calculate it — I can test that hypothesis by using Introduce Assertion
    assert(this._production === this.calculatedProduction)
    return this._production
  }


  // I can just calculate that value, without having to update it
  get calculatedProduction() {
    return this._adjustments.reduce((prev, a) => prev + a.amount, 0)
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}
