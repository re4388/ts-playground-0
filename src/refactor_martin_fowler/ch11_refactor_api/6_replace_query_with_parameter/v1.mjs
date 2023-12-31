class HeatingPlan {
  get targetTemperature() {
    //  as a programmer I might be more concerned about how the targetTemperature function has a dependency on a global thermostat object. I can break this dependency by moving it to a parameter.

    // My first step is to use Extract Variable (119) on the parameter that I want to have in my function.
    const selectedTemperature = thermostat.selectedTemperature;
    if (selectedTemperature > this._max) {
      return this._max
    } else {
      if (selectedTemperature < this._min) {
        return this._min
      } else {
        return selectedTemperature
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
