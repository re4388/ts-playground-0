// from


function f1() {
  if (anEmployee.seniority < 2) return 0
  if (anEmployee.monthsDisabled > 12) return 0
  if (anEmployee.isPartTime) return 0

}


// to

function f2() {
  if (isNotEligableForDisability()) return 0

  function isNotEligableForDisability() {
    return ((anEmployee.seniority < 2) || (anEmployee.monthsDisabled > 12) || (anEmployee.isPartTime)
    )
  }


}


