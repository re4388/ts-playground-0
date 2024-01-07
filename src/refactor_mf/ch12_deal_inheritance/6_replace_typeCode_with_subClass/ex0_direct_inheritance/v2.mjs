// I’ll start with this overused employee example


class Employee {
  constructor(name, type) {
    this.validateType(type)
    this._name = name
    this._type = type
  }

  // My first step is to use Encapsulate Variable (132) to self-encapsulate the type code.
  get type() {
    return this._type
  }

  validateType(arg) {
    if (!['engineer', 'manager', 'salesman'].includes(arg)) throw new Error(`Employee cannot be of type ${arg}`)
  }

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

export {}
