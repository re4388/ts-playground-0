// This situation is the result of an Extract Class (182) where the old parent still holds update methods for the new object.
// This is a good time to apply Change Reference to Value since there is only one reference to the new class.


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

// The first thing I need to do is to make the telephone number immutable.
// I do this by applying Remove Setting Method (331) to the fields.


class TelephoneNumber {
  // The first step of Remove Setting Method (331) is to use Change Function Declaration (124)
  // to add the two fields to the constructor and enhance the constructor to call the setters.
  constructor(areaCode, number) {
    this._areaCode = areaCode
    this._number = number
  }

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
