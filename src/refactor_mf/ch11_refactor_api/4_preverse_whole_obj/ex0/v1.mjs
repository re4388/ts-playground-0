// Consider a room monitoring system. It compares its daily temperature range with a range in a predefined heating plan.

// caller...
const low = aRoom.daysTempRange.low
const high = aRoom.daysTempRange.high
if (!aPlan.withinRange(low, high))
  alerts.push('room temperature went outside range')


class HeatingPlan {
  withinRange(bottom, top) {
    return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high)
  }

  // I begin by stating the interface I want as an empty function.
  xxNEWwithinRange(aNumberRange) {
    return this.withinRange(aNumberRange.low, aNumberRange.high);
  }


}
