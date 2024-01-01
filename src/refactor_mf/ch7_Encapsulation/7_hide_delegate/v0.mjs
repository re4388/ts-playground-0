class Person {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  get department() {
    return this._department
  }

  set department(arg) {
    this._department = arg
  }
}


class Department {
  get chargeCode() {
    return this._chargeCode
  }

  set chargeCode(arg) {
    this._chargeCode = arg
  }

  get manager() {
    return this._manager
  }

  set manager(arg) {
    this._manager = arg
  }

}

// Some client code wants to know the manager of a person. To do this, it needs to get the department first.
//  client code...
manager = aPerson.department.manager;


// This reveals to the client how the department class works and that the department is responsible for tracking the manager.
// I can reduce this coupling by hiding the department class from the client
