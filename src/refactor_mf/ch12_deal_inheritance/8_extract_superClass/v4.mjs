// I’m pondering these two classes, they share some common functionality—their name and the notions of annual and monthly costs:

// I begin by creating an empty superclass and letting them both extend from it.
class Party {
  // When doing Extract Superclass, I like to start with the data, which in JavaScript involves manipulating the constructor.
  // So I start with Pull Up Field (353) to pull up the name.
  constructor(name) {
    this._name = name
  }

  // As I get data up to the superclass, I can also apply Pull Up Method (350) on associated methods. First, the name:
  get name() {
    return this._name
  }

  get annualCost() {
    return this.monthlyCost * 12
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name)
    this._id = id
    this._name = name
    this._monthlyCost = monthlyCost
  }

  get monthlyCost() {
    return this._monthlyCost
  }


  get id() {
    return this._id
  }


}

// The methods they use, monthlyCost and totalMonthlyCost, have different names and different bodies—but do they represent the same intent? If so, I should use Change Function Declaration (124) to unify their names.
class Department extends party {
  constructor(name, staff) {
    super(name)
    this._name = name
    this._staff = staff
  }

  get staff() {
    return this._staff.slice()
  }


  get totalMonthlyCost() {
    return this.staff
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost)
  }

  get headCount() {
    return this.staff.length
  }

  get totalAnnualCost() {
    return this.monthlyCost * 12
  }


  get monthlyCost() {
    return this.totalMonthlyCost * 12
  }
}

export {}
