function adjustedCapital(anInstrument) {
  if (checkInstr()) return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor
  else return 0
}


function checkInstr() {
  return anInstrument.capital > 0 && anInstrument.interestRate > 0 && anInstrument.duration > 0
}
