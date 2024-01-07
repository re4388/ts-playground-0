// from

class Party {
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super()
    this._id = id
    this._name = name
    this._monthlyCost = monthlyCost
  }
}

// to
class Party {
  constructor(name) {
    this._name = name
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name)
    this._id = id
    this._monthlyCost = monthlyCost
  }
}

/**
 *
 * 共有的，且需要一起實例化出來的，拉到 superclass
 *
 * why
 *
 * Constructors are tricky things.
 * They aren’t quite normal methods—so I’m more restricted in what I can do with them.
 *
 * If I see subclass methods with common behavior,
 * my first thought is to use Extract Function (106) followed by Pull Up Method (350), which will move it nicely into the superclass.
 *
 * Constructors tangle that — because they have special rules about what can be done in what order,
 * so I need a slightly different approach.
 *
 * If this refactoring starts getting messy, I reach for Replace Constructor with Factory Function (334).
 */


export {}
