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

/**
 *
 * Why?
 * a class should be a crisp abstraction, only handle a few clear responsibilities
 *
 * 隨著時間過去，東加西加，是時候拉出無關的東西了
 *
 * When and how?
 *
 * 1. A good sign is when a subset of the data and a subset of the methods seem to go together.
 * 2. Other good signs are subsets of data that usually change together or are particularly dependent on each other.
 * 3. A useful test is to ask yourself what would happen if you remove a piece of data or a method. What other fields and methods would become nonsense?
 *
 *
 */
