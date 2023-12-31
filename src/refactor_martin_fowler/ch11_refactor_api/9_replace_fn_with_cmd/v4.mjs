// begin by creating an empty class and then Move Function (198) to move the function into it.


// the whole point of doing this refactoring is to allow me to break down the complicated functions—so let me outline some steps to achieve that. My next move here is to change all the local variables into fields.
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
    this.result = 0
    let healthLevel = 0
    let highMedicalRiskFlag = false

    if (this.medicalExam.isSmoker) {
      healthLevel += 10
      highMedicalRiskFlag = true
    }

    let certificationGrade = 'regular'
    if (this.scoringGuide.stateWithLowCertification(this.candidate.originState)) {
      certificationGrade = 'low'
      this.result -= 5
    }

    // lots more code like this...
    this.result -= Math.max(healthLevel - 5, 0)

    return this.result

  }
}
