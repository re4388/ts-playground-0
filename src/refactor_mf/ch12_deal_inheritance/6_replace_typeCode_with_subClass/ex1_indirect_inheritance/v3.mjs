// Let’s go back to the starting case
// but this time, I already have existing subclasses for part-time and full-time employees,
// so I can’t subclass from Employee for the type codes.
// Another reason to not use direct inheritance is keeping the ability
// to change the type of employee.


class EmployeeType {
  get capitalizedName() {
    return this.toString().charAt(0).toUpperCase()
      + this.toString().substr(1).toLowerCase(); }
}

// For those familiar with the first edition of the book, this example essentially supersedes the Replace Type Code with State/Strategy. I now think of that refactoring as Replace Type Code with Subclasses using indirect inheritance, so didn’t consider it worth its own entry in the catalog. (I never liked the name anyway.)

class Engineer extends EmployeeType {
  toString() {
    return 'engineer'
  }
}

class Manager extends EmployeeType {
  toString() {
    return 'manager'
  }
}

class Salesman extends EmployeeType {
  toString() {
    return 'salesman'
  }
}

// If I were leaving it at that, I could remove the empty EmployeeType. But I prefer to leave it there as it makes explicit the relationship between the various subclasses. It’s also a handy spot for moving other behavior there, such as the capitalization logic I tossed into the example specifically to illustrate this point.

// I then apply the usual mechanics of Replace Type Code with Subclasses to the employee type.
class Employee {

  set type(arg) {
    this._type = Employee.createEmployeeType(arg)
  }

  static createEmployeeType(aString) {
    switch (aString) {
      case 'engineer':
        return new Engineer()
      case 'manager':
        return new Manager()
      case 'salesman':
        return new Salesman()
      default:
        throw new Error(`Employee cannot be of type ${aString}`)
    }
  }

  constructor(name, type) {
    this.validateType(type)
    this._name = name
    this._type = type
  }

  validateType(arg) {
    if (!['engineer', 'manager', 'salesman'].includes(arg)) throw new Error(`Employee cannot be of type ${arg}`)
  }

  get typeString() {
    return this._type.toString()
  }

  get type() {
    return this._type
  }

  set type(arg) {
    this._type = arg
  }

  get capitalizedType() {
    return this.typeString.charAt(0).toUpperCase()
      + this.typeString.substr(1).toLowerCase()
  }


  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }

}


// My first step is to use Replace Primitive with Object (174) on the type code.
class EmployeeType {
  constructor(aString) {
    this._value = aString
  }

  toString() {
    return this._value
  }
}


export {}
