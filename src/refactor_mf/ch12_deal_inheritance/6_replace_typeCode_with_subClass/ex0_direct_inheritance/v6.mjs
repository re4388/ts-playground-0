// I’ll start with this overused employee example


class Employee {
  constructor(name, type) {

    // After testing to ensure all is still well, I can remove the validation logic, since the switch is effectively doing the same thing.
    // this.validateType(type)
    this._name = name

    // Once I’m done with them all, I can remove the type code field and the superclass getting method (the ones in the subclasses remain).
  }


  // validateType(arg) {
  //   if (!['engineer', 'manager', 'salesman'].includes(arg)) throw new Error(`Employee cannot be of type ${arg}`)
  // }

  toString() {
    return `${this._name} (${this._type})`
  }

}

// I pick one type code, the engineer, to start with.
// I use direct inheritance, subclassing the employee class itself.
// The employee subclass is simple — just overriding the type code getter with the appropriate literal value.
class Engineer extends Employee {
  get type() {
    return 'engineer'
  }
}

class Salesman extends Employee {
  get type() {
    return 'salesman'
  }
}

class Manager extends Employee {
  get type() {
    return 'manager'
  }
}

// To use the new subclass, I add selector logic into the factory.
function createEmployee(name, type) {
  switch (type) {
    case 'engineer':
      return new Engineer(name, type)
    case 'salesman':
      return new Salesman(name, type)
    case 'manager':
      return new Manager(name, type)
    default:
      throw new Error(`Employee cannot be of type ${type}`)
  }

}

// I test to ensure that worked out correctly. But, because I’m paranoid, I then alter the return value of the engineer’s override and test again to ensure the test fails. That way I know the subclass is being used.

export {}
