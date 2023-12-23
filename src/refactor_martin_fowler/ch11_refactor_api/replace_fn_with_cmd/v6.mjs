// begin by creating an empty class and then Move Function (198) to move the function into it.


// the whole point of doing this refactoring is to allow me to break down the complicated functions—so let me outline some steps to achieve that. My next move here is to change all the local variables into fields.
function score(candidate, medicalExam, scoringGuide) {
  return new Score(candidate, medicalExam, scoringGuide).execute()
}


// I’ve moved all the function’s state to the command object, I can use refactorings like Extract Function (106) without getting tangled up in all the variables and their scopes.
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

    this.scoreSmoking()

    let certificationGrade = 'regular'
    if (this.scoringGuide.stateWithLowCertification(this.candidate.originState)) {
      certificationGrade = 'low'
      this.result -= 5
    }

    // lots more code like this...
    this.result -= Math.max(this.healthLevel - 5, 0)

    return this.result
  }


  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10
      this._highMedicalRiskFlag = true
    }
  }
}
