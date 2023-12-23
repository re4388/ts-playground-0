/**
 * Sometimes, I run into a series of conditional checks where each check is different yet the resulting action is the same.
 * When I see this, I use and and or operators to consolidate them into a single conditional check with a single result.
 *
 *
 * 好處
 * 1. put together related logic
 * 2. show the intent, show `what`
 */



function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) return 0
  if (anEmployee.monthsDisabled > 12) return 0
  if (anEmployee.isPartTime) return 0
  
  // then, compute the disability amount...
}

