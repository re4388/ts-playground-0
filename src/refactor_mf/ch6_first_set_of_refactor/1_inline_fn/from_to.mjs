// from

function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5
}

// to
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1
}
