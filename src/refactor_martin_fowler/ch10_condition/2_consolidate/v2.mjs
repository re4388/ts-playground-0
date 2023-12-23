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

  if (isNotEligableForDisability()) {
    return 0
  }

  // then, compute the disability amount...
}


function isNotEligableForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  )
}


// 另一種 是 add 的 case

function before() {
  if (anEmployee.onVacation) {
    if (anEmployee.seniority > 10) {

      return 1
    }
  }

  return 0.5
}

function after() {
  if (anEmployee.onVacation && anEmployee.seniority > 10) {
    return 1
  }

  return 0.5
}
