// from

const low = aRoom.daysTempRange.low
const high = aRoom.daysTempRange.high
if (aPlan.withinRange(low, high)) {
  console.log(`done`)
}

// to
  if (aPlan.withinRange(aRoom.daysTempRange)){
    console.log(`done`)
  }

/**
 * why
 *
 * If I see code that derives a couple of values from a record and then passes these values into a function, I like to replace those values with the whole record itself, letting the function body derive the values it needs.
 *
 * Passing the whole record handles change better should the called function need more data from the whole in the future — that change would not require me to alter the parameter list.
 *
 * It also reduces the size of the parameter list, which usually makes the function call easier to understand. If many functions are called with the parts, they often duplicate the logic that manipulates these parts — logic that can often be moved to the whole.
 *
 * The main reason I wouldn’t do this is if I don’t want the called function to have a dependency on the whole — which typically occurs when they are in different modules.
 *
 * Pulling several values from an object to do some logic on them alone is a smell (Feature Envy (77)), and usually a signal that this logic should be moved into the whole itself. Preserve Whole Object is particularly common after I’ve done Introduce Parameter Object (140), as I hunt down any occurrences of the original data clump to replace them with the new object.
 *
 * If several bits of code only use the same subset of an object’s features, then that may indicate a good opportunity for Extract Class (182).
 * One case that many people miss is when an object calls another object with several of its own data values. If I see this, I can replace those values with a self-reference (this in JavaScript).
 */
