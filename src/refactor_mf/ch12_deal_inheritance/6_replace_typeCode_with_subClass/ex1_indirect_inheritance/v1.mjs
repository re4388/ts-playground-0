// Let’s go back to the starting case
// but this time, I already have existing subclasses for part-time and full-time employees,
// so I can’t subclass from Employee for the type codes.
// Another reason to not use direct inheritance is keeping the ability
// to change the type of employee.


class Employee {
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
    return `${this._name} (${this.capitalizedType})`
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
