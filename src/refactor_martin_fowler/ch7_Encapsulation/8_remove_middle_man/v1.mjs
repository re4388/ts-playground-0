// I begin with a person class that uses a linked department object to determine a manager.

// client code...
// manager = aPerson.manager
// Now I go to each client at a time and modify them to use the department directly.
manager = aPerson.department.manager;

// Once I’ve done this with all the clients, I can remove the manager method from Person. I can repeat this process for any other simple delegations on Person.

class Person {

  // This is simple to use and encapsulates the department.
  // However, if lots of methods are doing this, I end up with too many of these simple delegations on the person.
  // That’s when it is good to remove the middle man.
  get manager() {
    return this._department.manager
  }

  // get department() {
  //   return this._department
  // }
}

class Department {
  get manager() {
    return this._manager
  }
}


// I can do a mixture here. Some delegations may be so common that I’d like to keep them to make client code easier to work with. There is no absolute reason why I should either hide a delegate or remove a middle man—particular circumstances suggest which approach to take, and reasonable people can differ on what works best.
