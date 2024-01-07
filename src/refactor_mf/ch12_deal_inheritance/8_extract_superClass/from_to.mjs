// from

class Department {
  get totalAnnualCost() {
  }

  get name() {
  }

  get headCount() {
  }
}

class Employee {
  get annualCost() {
  }

  get name() {
  }

  get id() {
  }
}

// to


class Party {
  get name() {
  }

  get annualCost() {
  }
}

class Department extends Party {
  get annualCost() {
  }

  get headCount() {
  }
}

class Employee extends Party {
  get annualCost() {
  }

  get id() {
  }
}

/**
 *
 * 有兩個 class 很多東西都是共用的，可以拉一個 superclass 出來
 *
 * why
 *
 * If I see two classes doing similar things,
 * I can take advantage of the basic mechanism of inheritance to pull their similarities together into a superclass.
 *
 * I can use Pull Up Field (353) to move common data into the superclass,
 * and Pull Up Method (350) to move the common behavior.
 *
 * Many writers on object orientation treat inheritance
 * as something that should be carefully planned in advance,
 * based on some kind of classification structure in the “real world.”
 *
 * Such classification structures can be a hint towards using inheritance—
 * but just as often inheritance is something I realize during the evolution of a program,
 * as I find common elements that I want to pull together.
 *
 * An alternative to Extract Superclass is Extract Class (182).
 *
 * Here you have, essentially, a choice between using inheritance or delegation
 * as a way to unify duplicate behavior.
 *
 * Often Extract Superclass is the simpler approach,
 * so I’ll do this first knowing I can use Replace Superclass with Delegate (399) should I need to later.
 */
