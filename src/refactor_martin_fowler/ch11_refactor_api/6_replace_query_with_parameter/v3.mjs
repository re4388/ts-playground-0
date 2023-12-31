class HeatingPlan {
  get targetTemperature() {
    // I then inline the variable I just extracted, which leaves the function as a simple call.
    return this.newFn(thermostat.selectedTemperature)
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
if (thePlan.newFn(thermostat.selectedTemperature) > thermostat.currentTemperature) {
  setToHeat()
} else {
  if (thePlan.newFn(thermostat.selectedTemperature) < thermostat.currentTemperature) {
    setToCool()
  } else {
    setOff()
  }
}
