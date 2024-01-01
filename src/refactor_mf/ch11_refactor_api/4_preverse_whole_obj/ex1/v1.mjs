// I want to rearrange the code so I can create the new function by using Extract Function (106) on some existing code. The caller code isn’t quite there yet, but I can get there by using Extract Variable (119) a few times. First, I disentangle the call to the old function from the conditional.
const low = aRoom.daysTempRange.low
const high = aRoom.daysTempRange.high
const isWithinRange = aPlan.withinRange(low, high)
if (!isWithinRange)
  alerts.push('room temperature went outside range')
