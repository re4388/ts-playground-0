// from

class Person {
  get genderCode() {
    return 'X'
  }
}

class Male extends Person {
  get genderCode() {
    return 'M'
  }
}

class Female extends Person {
  get genderCode() {
    return 'F'
  }
}

// to

class Person {
  get genderCode() {
    return this._genderCode
  }
}

/**
 * why
 *
 * formerly: Replace Subclass with Fields
 * inverse of: Replace Type Code with Subclasses (362)
 *
 *
 * Subclasses are useful. They support variations in data structure and polymorphic behavior.
 *
 * They are a good way to program by difference.
 *
 * But as a software system evolves, subclasses can lose their value as the variations they support are moved to other places or removed altogether.
 *
 * Sometimes, subclasses are added in anticipation of features that never end up being built, or end up being built in a way that doesn’t need the subclasses.
 *
 * A subclass that does too little incurs a cost in understanding that is no longer worthwhile.
 * When that time comes, it’s best to remove the subclass, replacing it with a field on its superclass.
 *
 */


export {}
