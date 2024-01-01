class HeatingPlan {
  get targetTemperature() {
    // That makes it easy to apply Extract Function (106) on the entire body of the function except for the bit that figures out the parameter.


    const selectedTemperature = thermostat.selectedTemperature
    return this.newFn(selectedTemperature)
  }

  newFn(selectedTemperature) {
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
