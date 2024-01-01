class Order {
  constructor(data) {
    this.priority = data.priority
    // more initialization
  }

  // Now I’m done with the formal refactoring. But as I look at who uses the prior- ity, I consider whether they should use the priority class themselves. As a result, I provide a getter on order that provides the new priority object directly.
  get priority() {
    return this._priority
  }


  // Now that I have a priority class, I find the current getter on the order to be misleading. It doesn’t return the priority—but a string that describes the priority. My immediate move is to use Rename Function (124).
  get priorityString() {
    return this._priority.toString()
  }

  set priority(aString) {
    this._priority = new Priority(aString)
  }

}

// The point of all this is that now, my new priority class can be useful as a place for new behavior—either new to the code or moved from elsewhere. Here’s some simple code to add validation of priority values and comparison logic:
class Priority {
  constructor(value) {
    if (!Priority.legalValues().includes(value)) {
      throw new Error(`<${value}> is invalid for Priority`)
    }

    if (value instanceof Priority) {
      return value
    }

    this._value = value
  }

  toString() {
    return this._value
  }

  get _index() {
    return Priority.legalValues().findIndex(s => s === this._value)
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush']
  }

  // As I do this, I decide that a priority should be a value object, so I provide an equals method and ensure that it is immutable.
  equals(other) {
    return this._index === other._index
  }

  higherThan(other) {
    return this._index > other._index
  }

  lowerThan(other) {
    return this._index < other._index
  }
}


// client
const orders = [new Order({ id: 'o1', priority: 'high' }), new Order({ id: 'o2', priority: 'normal' })]
const highPriorityCount = orders.filter(order => order.priority.higherThan(new Priority("normal"))).length
