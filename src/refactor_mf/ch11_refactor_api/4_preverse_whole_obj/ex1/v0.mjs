// caller...
const low = aRoom.daysTempRange.low
const high = aRoom.daysTempRange.high
if (!aPlan.withinRange(low, high))
  alerts.push('room temperature went outside range')
