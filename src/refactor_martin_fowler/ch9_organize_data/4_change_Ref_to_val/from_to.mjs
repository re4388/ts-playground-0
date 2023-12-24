// from

class Product {
  applyDiscount(arg) {
    this._price.amount -= arg
  }
}

// to

class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency)
  }
}

/**
 * If I treat a field as a value, I can change the class of the inner object to make it a Value Object [mf-vo].
 * Value objects are generally easier to reason about, particularly because they are immutable.
 *
 * In general, immutable data structures are easier to deal with.
 *
 * I can pass an immutable data value out to other parts of the program
 * and not worry that it might change without the enclosing object being aware of the change.
 *
 * I can replicate values around my program and not worry about maintaining memory links.
 *
 * Value objects are especially useful in distributed and concurrent systems.
 *
 * On the other hand, if I want to share an object between several objects so that any change to the shared object
 * is visible to all its collaborators, then I need the shared object to be a reference.
 */
