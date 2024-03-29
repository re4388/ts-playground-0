// begin by creating an empty class and then Move Function (198) to it.


// command object 就是一個負責 execute 的 class
function score(candidate, medicalExam, scoringGuide) {
  return new Score().execute(candidate, medicalExam, scoringGuide)
}


class Score {
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0
    let healthLevel = 0
    let highMedicalRiskFlag = false

    if (medicalExam.isSmoker) {
      healthLevel += 10
      highMedicalRiskFlag = true
    }

    let certificationGrade = 'regular'
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = 'low'
      result -= 5
    }

    // lots more code like this...
    result -= Math.max(healthLevel - 5, 0)

    return result

  }
}
