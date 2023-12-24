class ProductionPlan {
  get production() {
    return this._production
  }

  applyAdjustment(anAdjustment) {
    /**
     * I see ugliness in duplication—not the common duplication of code but duplication of data.
     */
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}
