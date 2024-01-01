// Consider a room monitoring system. It compares its daily temperature range with a range in a predefined heating plan.

// When I’ve changed the calls, I may see that some of the earlier code isn’t needed anymore, so I wield Remove Dead Code (237).
if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
  alerts.push("room temperature went outside range");




class HeatingPlan {
  withinRange(bottom, top) {
    return (bottom >= this._temperatureRange.low) && (top <= this._temperatureRange.high)
  }

  // Once I’ve replaced them all, I can use Inline Function (115) on the original function.
  xxNEWwithinRange(aNumberRange) {
    return (aNumberRange.low >= this._temperatureRange.low) && (aNumberRange.high <= this._temperatureRange.high);
  }


}
