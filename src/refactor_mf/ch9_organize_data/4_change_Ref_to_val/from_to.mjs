// from

class Product {
  applyDiscount(arg) {
    this._price.amount -= arg
  }
}

// to

class Product {
  applyDiscount(arg) {
    /**
     * 這邊的 value 就是說 new 出一個獨立的實例出來 v.s. reference 同一個的概念
     */
    this._price = new Money(this._price.amount - arg, this._price.currency)
  }
}

/**
 * If I treat a field as a value, I can change the class of the inner object to make it a Value Object [mf-vo].
 *
 * what is VO:
 * 1. 不同於一般 class 用 entity 來 identify, VO 用其 value 來 identify
 * 2. 如果兩個 VO 的 value 一樣，就是同個東西
 * 3. 一般會具備 immutable的特性
 *
 * 常見例子：
 * Date and Time: representing a specific date and time
 * Money: representing a certain amount of currency with its associated value.
 * Coordinates: Latitude and longitude can be combined to create a value object representing a location.
 *
 *
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
