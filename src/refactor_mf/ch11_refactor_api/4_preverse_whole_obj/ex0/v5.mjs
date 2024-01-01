// Consider a room monitoring system. It compares its daily temperature range with a range in a predefined heating plan.

// When I’ve changed the calls, I may see that some of the earlier code isn’t needed anymore, so I wield Remove Dead Code (237).
if (!aPlan.withinRange(aRoom.daysTempRange))
  alerts.push("room temperature went outside range");




class HeatingPlan {


  // And I finally remove that ugly prefix from the new function and all its callers. The prefix makes it a simple global replace, even if I don’t have a robust rename support in my editor.
  withinRange(aNumberRange) {
    return (aNumberRange.low >= this._temperatureRange.low) && (aNumberRange.high <= this._temperatureRange.high);
  }


}
