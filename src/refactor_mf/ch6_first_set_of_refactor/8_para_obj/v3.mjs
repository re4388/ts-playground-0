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

function readingsOutsideRangeV1(station, min, max, range) {
  return station.readings
    .filter(r => r.temp < min || r.temp > max)
}


// caller1 先無法改, 其他 team 管理
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling)

// caller2
let range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

readingsOutsideRangeV1(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, range)



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
