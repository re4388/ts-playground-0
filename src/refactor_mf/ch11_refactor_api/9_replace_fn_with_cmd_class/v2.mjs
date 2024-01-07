// begin by creating an empty class and then Move Function (198) to it.


// Most of the time, I prefer to pass arguments to a command on the constructor and have the execute method take no parameters
// since it’s very handy when I want to manipulate the command with a more complicated parameter setting lifecycle or customizations.
function score(candidate, medicalExam, scoringGuide) {
  return new Score(candidate).execute(medicalExam, scoringGuide)
}


class Score {


  constructor(candidate) {
    this.candidate = candidate
  }

  execute(medicalExam, scoringGuide) {
    let result = 0
    let healthLevel = 0
    let highMedicalRiskFlag = false

    if (medicalExam.isSmoker) {
      healthLevel += 10
      highMedicalRiskFlag = true
    }

    let certificationGrade = 'regular'
    if (scoringGuide.stateWithLowCertification(this.candidate.originState)) {
      certificationGrade = 'low'
      result -= 5
    }

    // lots more code like this...
    result -= Math.max(healthLevel - 5, 0)

    return result

  }
}
