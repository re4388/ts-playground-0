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
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }

  get officeNumber() {
    return this._telephoneNumber.number
  }

  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

// after this step, the telephone number is immutable
// 因為不會去 mutate 原本的 field, 而是 new 一個新的 with input new arg



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
