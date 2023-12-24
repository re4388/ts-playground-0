// from

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

// to

class Person {
  get officeAreaCode() {
    return this._officeAreaCode
  }

  get officeNumber() {
    return this._officeNumber
  }
}


/**
 * why?
 *
 *  I use Inline Class if a class is no longer pulling its weight and shouldn’t be around any more.
 *  Often, this is the result of refactoring that moves other responsibilities out of the class so there is little left.
 *  At that point, I fold the class into another—one that makes most use of the runt class.
 *
 *
 *  Another reason to use Inline Class is sometimes I may find it easier to first use Inline Class to combine them into a single class,
 *  then Extract Class (182) to make the new separation.
 */
