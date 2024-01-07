// from

// 結果一樣的 條件，可以有機會整合起來，甚至抽成函數，明示其意義

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


