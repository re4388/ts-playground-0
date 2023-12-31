// begin by creating an empty class and then Move Function (198) to move the function into it.


// Most of the time, I prefer to pass arguments to a command on the constructor and have the execute method take no parameters since it’s very handy when I want to manipulate the command with a more complicated parameter setting lifecycle or customiza- tions.
function score(candidate, medicalExam, scoringGuide) {
  return new Score(candidate, medicalExam, scoringGuide).execute()
}


class Score {

  constructor(candidate, medicalExam, scoringGuide) {
    this.candidate = candidate
    this.medicalExam = medicalExam
    this.scoringGuide = scoringGuide
  }

  execute() {
    let result = 0
    let healthLevel = 0
    let highMedicalRiskFlag = false

    if (this.medicalExam.isSmoker) {
      healthLevel += 10
      highMedicalRiskFlag = true
    }

    let certificationGrade = 'regular'
    if (this.scoringGuide.stateWithLowCertification(this.candidate.originState)) {
      certificationGrade = 'low'
      result -= 5
    }

    // lots more code like this...
    result -= Math.max(healthLevel - 5, 0)

    return result

  }
}
