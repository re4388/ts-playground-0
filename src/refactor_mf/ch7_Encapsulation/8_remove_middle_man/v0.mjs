// I begin with a person class that uses a linked department object to determine a manager.

// client code...
manager = aPerson.manager

class Person {

  // This is simple to use and encapsulates the department.
  // However, if lots of methods are doing this, I end up with too many of these simple delegations on the person.
  // That’s when it is good to remove the middle man.
  get manager() {
    return this._department.manager
  }
}

class Department {
  get manager() {
    return this._manager
  }
}
