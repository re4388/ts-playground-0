

// caller
// Since the original function is in a different context (the HeatingPlan class), I need
// to use Move Function (198).
const tempRange = aRoom.daysTempRange;
// With that done, I can now use Extract Function (106) to create the new function.
const isWithinRange = aPlan.xxNEWwithinRange(tempRange);
if (!isWithinRange)
  alerts.push('room temperature went outside range')


class HeatingPlan {
  xxNEWwithinRange(tempRange) {
    const low = tempRange.low;
    const high = tempRange.high;
    const isWithinRange = this.withinRange(low, high); return isWithinRange;
  }
}

// I then continue as before, replacing other callers and inlining the old function into the new one. I would also inline the variables I extracted to provide the clean separation for extracting the new function.
// Because this variation is entirely composed of refactorings, it’s particularly handy when I have a refactoring tool with robust extract and inline operations.
