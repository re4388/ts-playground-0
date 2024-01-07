// from


class Employee {
  get quota() {
  }
}

class Engineer extends Employee {
}

class Salesman extends Employee {
}

// to

class Employee {

}

class Engineer extends Employee {

}

class Salesman extends Employee {
  get quota() {
  }
}


/**
 * why
 *
 * inverse of: Pull Up Method (350)
 *
 * If a method is only relevant to one subclass, removing it from the superclass
 * and putting it only on the subclass(es) makes that clearer.
 *
 * I can only do this refactoring if the caller knows it’s working with a particular subclass
 * — otherwise, I should use Replace Conditional with Polymorphism (272) with some placebo behavior on the superclass.
 */
