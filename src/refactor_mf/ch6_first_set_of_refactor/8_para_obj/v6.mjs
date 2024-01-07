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

// 原本的不動, 先不砍
function readingsOutsideRange(station, min, max) {
  return station.readings
    .filter(r => r.temp < min || r.temp > max)
}

// old interface, new implementation
function readingsOutsideRange(station, min, max) {
  readingsOutsideRangeV1(station, min, max, undefined)
}

// That completes this refactoring. However, replacing a clump of parameters with a real object is just the setup for the really good stuff.
// The great benefits of making a class like this is that I can then move behavior into the new class. In this case, I’d add a method for range that tests if a value falls within the range.

function readingsOutsideRangeV1(station, range) {
  return station.readings
    .filter(r => !range.contains(r.temp))
}

// caller1 先無法改, 其他 team 管理
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling)

// caller2
let range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

readingsOutsideRangeV1(station, range);



// This is a first step to creating a range that can take on a lot of useful behavior.
// Once I’ve identified the need for a range in my code, I can be constantly on the lookout for other cases where I see a max/min pair of numbers and replace them with a range.
// (One immediate possibility is the operating plan, replacing temperatureFloor and temperatureCeiling with a temperatureRange.) As I look at how these pairs are used, I can move more useful behavior into the range class, simplifying its usage across the code base. One of the first things I may add is a value-based equality method to make it a true value object.



class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max }
  }

  contains(arg) {
    return (arg >= this.min && arg <= this.max)
  }

  get min() {
    return this._data.min
  }

  get max() {
    return this._data.max
  }
}
