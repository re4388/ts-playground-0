const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' }
  ]
}

// Now I can start replacing the usage of the parameters. I’ll start with the
// maximum.
function readingsOutsideRange(station, range) {
  return station.readings
    .filter(r => r.temp < range.min || r.temp > range.max)
}

// caller
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
alerts = readingsOutsideRange(station, range);
// I can test at this point, then remove the other parameter.


// I still haven’t altered any behavior yet, as the parameter isn’t used. All tests should still work.


// A range like this is a common case where two separate data items are better combined into a single object. I’ll begin by declaring a class for the combined data.

// I declare a class, rather than just using a basic JavaScript object, because I usually find this refactoring to be a first step to moving behavior into the newly created object. Since a class makes sense for this, I go right ahead and use one directly. I also don’t provide any update methods for the new class, as I’ll probably make this a Value Object [mf-vo]. Most times I do this refactoring, I create value objects.


class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }

  get min() {
    return this._data.min
  }

  get max() {
    return this._data.max
  }
}
