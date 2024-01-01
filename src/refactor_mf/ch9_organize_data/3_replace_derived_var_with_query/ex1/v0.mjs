

// The above example is nice and easy because there’s clearly a single source for the value of production.
// But sometimes, more than one element can combine in the accumulator.
class ProductionPlan {
  constructor(production) {
    this._production = production
    this._adjustments = []
  }

  get production() {
    return this._production
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}
