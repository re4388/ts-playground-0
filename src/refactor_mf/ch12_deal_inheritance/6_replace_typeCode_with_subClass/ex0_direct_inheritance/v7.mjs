// I’ll start with this overused employee example


class Employee {
  constructor(name) {

    // After testing to ensure all is still well, I can remove the validation logic, since the switch is effectively doing the same thing.
    // this.validateType(type)
    this._name = name

    // Once I’m done with them all, I can remove the type code field and the superclass getting method (the ones in the subclasses remain).
  }


  // validateType(arg) {
  //   if (!['engineer', 'manager', 'salesman'].includes(arg)) throw new Error(`Employee cannot be of type ${arg}`)
  // }

  toString() {
    return `${this._name}`
  }

}

// I pick one type code, the engineer, to start with.
// I use direct inheritance, subclassing the employee class itself.
// The employee subclass is simple — just overriding the type code getter with the appropriate literal value.
class Engineer extends Employee {

  // I still have the type code accessors on the subclasses—get type. I’ll usually want to remove these too, but that may take a bit of time due to other methods that depend on them. I’ll use Replace Conditional with Polymorphism (272) and Push Down Method (359) to deal with these. At some point, I’ll have no code that uses the type getters, so I will subject them to the tender mercies of Remove Dead Code (237).
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
      return new Engineer(name)
    case 'salesman':
      return new Salesman(name)
    case 'manager':
      return new Manager(name)
    default:
      throw new Error(`Employee cannot be of type ${type}`)
  }

}

// I test to ensure that worked out correctly. But, because I’m paranoid, I then alter the return value of the engineer’s override and test again to ensure the test fails. That way I know the subclass is being used.

export {}
