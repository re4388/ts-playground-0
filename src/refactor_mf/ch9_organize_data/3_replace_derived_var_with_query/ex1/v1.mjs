

// The above example is nice and easy because there’s clearly a single source for the value of production.
// But sometimes, more than one element can combine in the accumulator.
class ProductionPlan {
  constructor(production) {
    // If I do the same Introduce Assertion (302) that I did above, it will now fail for any case where the initial value of the production isn’t zero.
    // But I can still replace the derived data. The only difference is that I must first apply Split Variable (240).
    this._initialProduction = production
    this._productionAccumulator = 0
    this._adjustments = []
  }

  get production() {
    return this._initialProduction + this._productionAccumulator;
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}
