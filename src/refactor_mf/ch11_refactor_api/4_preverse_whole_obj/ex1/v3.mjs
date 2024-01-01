// I want to rearrange the code so I can create the new function by using Extract Function (106) on some existing code. The caller code isn’t quite there yet, but I can get there by using Extract Variable (119) a few times. First, I disentangle the call to the old function from the conditional.

// I then extract the input parameter
const tempRange = aRoom.daysTempRange;
// With that done, I can now use Extract Function (106) to create the new function.
const isWithinRange = xxNEWwithinRange(aPlan, tempRange);
if (!isWithinRange)
  alerts.push('room temperature went outside range')


function xxNEWwithinRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}
