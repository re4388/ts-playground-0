class HeatingPlan {
  targetTemperature(selectedTemperature) {
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
if (thePlan.targetTemperature(thermostat.selectedTemperature) > thermostat.currentTemperature) {
  setToHeat()
} else {
  if (thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature) {
    setToCool()
  } else {
    setOff()
  }
}

/**
 * As is often the case with this refactoring, the calling code looks more unwieldy than before.Moving a dependency out of a module pushes the responsibility of dealing with that dependency back to the caller. That’s the trade-off for the reduced coupling.
 *
 *
 * But removing the coupling to the thermostat object isn’t the only gain I’ve made with this refactoring. The HeatingPlan class is immutable — its fields are set in the constructor with no methods to alter them. (I’ll save you the effort of looking at the whole class; just trust me on this.) Given an immutable heating plan, by moving the thermostat reference out of the function body I’ve also made targetTemperature referentially transparent. Every time I call targetTemperature on the same object, with the same argument, I will get the same result. If all the methods of the heating plan have referential transparency, that makes this class much easier to test and reason about.
 *
 * A problem with JavaScript’s class model is that it’s impossible to enforce an immutable class — there’s always a way to get at an object’s data. But writing a class to signal and encourage immutability is often good enough. Creating classes that have this characteristic is often a sound strategy and Replace Query with Parameter is a handy tool for doing this.
 */
