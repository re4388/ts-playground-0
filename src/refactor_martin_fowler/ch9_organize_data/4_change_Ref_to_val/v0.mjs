


class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber()
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode
  }

  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg
  }

  get officeNumber() {
    return this._telephoneNumber.number
  }

  set officeNumber(arg) {
    this._telephoneNumber.number = arg
  }
}

// This situation is the result of an Extract Class (182) where the old parent (Person) still holds update methods for the new object (TelephoneNumber).
// This is a good time to apply Change Reference to Value since there is only one reference to the new TelephoneNumber class.

class TelephoneNumber {
  get areaCode() {
    return this._areaCode
  }

  set areaCode(arg) {
    this._areaCode = arg
  }

  get number() {
    return this._number
  }

  set number(arg) {
    this._number = arg
  }
}
