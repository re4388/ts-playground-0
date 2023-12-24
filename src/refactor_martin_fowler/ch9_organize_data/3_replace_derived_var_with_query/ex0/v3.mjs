import assert from 'node:assert'

class ProductionPlan {
  get production() {
    // inline fn
    return this._adjustments
      .reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)

    // no need
    // this._production += anAdjustment.amount
  }
}
