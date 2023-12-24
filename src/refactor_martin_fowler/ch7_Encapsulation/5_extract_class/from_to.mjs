// from

class Person {
  get officeAreaCode() {
    return this._officeAreaCode
  }

  get officeNumber() {
    return this._officeNumber
  }

}

// to


class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode
  }

  get officeNumber() {
    return this._telephoneNumber.number
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode
  }

  get number() {
    return this._number
  }

}
