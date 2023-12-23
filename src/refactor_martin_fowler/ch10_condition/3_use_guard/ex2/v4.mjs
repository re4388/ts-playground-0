function adjustedCapital(anInstrument) {
  if (!checkInstr()) return 0

  return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
}


function checkInstr() {
  return anInstrument.capital > 0 && anInstrument.interestRate > 0 && anInstrument.duration > 0
}
