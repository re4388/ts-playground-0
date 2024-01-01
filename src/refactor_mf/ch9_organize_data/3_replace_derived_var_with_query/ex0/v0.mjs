class ProductionPlan {
  get production() {
    return this._production
  }

  applyAdjustment(anAdjustment) {
    /**
     * I see ugliness in duplication —not the common duplication of code but duplication of data.
     *
     * 1. anAdjustment 被推到 this._adjustments
     * 2. anAdjustment 被累積到 this._production
     */
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}
