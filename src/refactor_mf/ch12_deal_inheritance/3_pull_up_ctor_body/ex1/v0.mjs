class Employee {
  constructor(name) {
  }

  // The wrinkle here comes from the fact that the call to isPrivileged can’t be made until after the grade field is assigned, and that can only be done in the subclass.
  get isPrivileged() {
  }

  assignCar() {
  }
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name)
    this._grade = grade
    if (this.isPrivileged) this.assignCar() // every subclass does this
  }

  get isPrivileged() {
    return this._grade > 4
  }
}
