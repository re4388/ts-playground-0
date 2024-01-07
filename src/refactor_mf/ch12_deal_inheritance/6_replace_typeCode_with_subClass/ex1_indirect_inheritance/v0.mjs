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

  get type() {
    return this._type
  }

  set type(arg) {
    this._type = arg
  }

  get capitalizedType() {
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase()
  }

  toString() {
    return `${this._name} (${this.capitalizedType})`
  }
}






export {}
