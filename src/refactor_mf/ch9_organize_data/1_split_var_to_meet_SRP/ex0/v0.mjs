function distanceTravelled(scenario, time) {
  let result = 0

  let acc = scenario.primaryForce / scenario.mass

  let primaryTime = Math.min(time, scenario.delay)
  result = 0.5 * acc * primaryTime * primaryTime

  let secondaryTime = time - scenario.delay

  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass
    result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime
  }

  return result
}

/**
 * The interesting thing for our example is the way the variable acc is set twice. It has two responsibilities: one to hold the initial acceleration from the first force and another later to hold the acceleration from both forces. I want to split this variable.
 */
