// begin by creating an empty class and then Move Function (198) to move the function into it.


// the whole point of doing this refactoring is to allow me to break down the complicated functions—so let me outline some steps to achieve that. My next move here is to change all the local variables into fields.
function score(candidate, medicalExam, scoringGuide) {
  return new Score(candidate, medicalExam, scoringGuide).execute()
}


// I repeat this for all the local variables.
  class Score {

  constructor(candidate, medicalExam, scoringGuide) {
    this.candidate = candidate
    this.medicalExam = medicalExam
    this.scoringGuide = scoringGuide
  }

  execute() {
    this.result = 0
    this.healthLevel = 0
    this.highMedicalRiskFlag = false

    if (this.medicalExam.isSmoker) {
      this.healthLevel += 10
      this.highMedicalRiskFlag = true
    }

    let certificationGrade = 'regular'
    if (this.scoringGuide.stateWithLowCertification(this.candidate.originState)) {
      certificationGrade = 'low'
      this.result -= 5
    }

    // lots more code like this...
    this.result -= Math.max(this.healthLevel - 5, 0)

    return this.result

  }
}
