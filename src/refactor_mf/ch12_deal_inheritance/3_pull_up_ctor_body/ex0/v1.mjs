class Party {
}


// The common code here is the assignment of the name.
// I use Slide Statements (223) to move the assignment in Employee next to the call to super():
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super()
    this._name = name
    this._id = id
    this._monthlyCost = monthlyCost
  }

  // rest of class...
}


class Department extends Party {
  constructor(name, staff) {
    super()
    this._name = name
    this._staff = staff
  }

  // rest of class...
}
