function adjustedCapital(anInstrument) {
  let result = 0
  if (checkInstr()) {
    result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
  }
  return result
}


function checkInstr() {
  return anInstrument.capital > 0 && anInstrument.interestRate > 0 && anInstrument.duration > 0

}
