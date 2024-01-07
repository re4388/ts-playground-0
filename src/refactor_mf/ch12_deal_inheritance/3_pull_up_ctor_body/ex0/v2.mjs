// I move the common code to the superclass.
// Since that code contains a reference to a constructor argument, I pass that in as a parameter.
class Party {
  constructor(name) {
    this._name = name
  }
}


// The common code here is the assignment of the name.
// I use Slide Statements (223) to move the assignment in Employee next to the call to super():
class Employee extends Party {
  constructor(id, monthlyCost) {
    super(name)
    this._id = id
    this._monthlyCost = monthlyCost
  }

  // rest of class...
}


class Department extends Party {
  constructor(staff) {
    super(name)
    this._staff = staff
  }

  // rest of class...
}
