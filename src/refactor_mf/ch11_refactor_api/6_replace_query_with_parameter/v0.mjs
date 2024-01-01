class HeatingPlan {
  get targetTemperature() {
    //  as a programmer I might be more concerned about how the targetTemperature function has a dependency on a global thermostat object. I can break this dependency by moving it to a parameter.
    if (thermostat.selectedTemperature > this._max) {
      return this._max
    } else {
      if (thermostat.selectedTemperature < this._min) {
        return this._min
      } else {
        return thermostat.selectedTemperature
      }
    }
  }
}


// caller...
if (thePlan.targetTemperature > thermostat.currentTemperature) {
  setToHeat()
} else {
  if (thePlan.targetTemperature < thermostat.currentTemperature) {
    setToCool()
  } else {
    setOff()
  }
}
