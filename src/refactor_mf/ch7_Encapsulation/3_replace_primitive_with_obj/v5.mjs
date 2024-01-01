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

// I create a simple value class for the priority. It has a constructor for the value and a conversion function to return a string.
class Priority {
  constructor(value) {
    // As the priority class becomes useful elsewhere, I would allow clients of the order to use the setter with a priority instance, which I do by adjusting the priority constructor.
    if (value instanceof Priority) {
      return value
    }
    this._value = value
  }

  // I prefer using a conversion function (toString) rather than a getter (value) here. For clients of the class, asking for the string representation should feel more like a conversion than getting a property.
  toString() {
    return this._value
  }
}


// client
const orders = [new Order({ id: 'o1', priority: 'high' }), new Order({ id: 'o2', priority: 'high' })]
const highPriorityCount = orders.filter(o => 'high' === o.priorityString || 'rush' === o.priorityString).length
