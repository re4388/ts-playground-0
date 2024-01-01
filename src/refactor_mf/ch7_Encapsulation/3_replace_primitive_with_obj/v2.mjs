class Order {
  constructor(data) {
    this.priority = data.priority
    // more initialization
  }


  // Whenever I’m fiddling with a data value, the first thing I do is use Encapsulate Variable (132) on it.
  get priority() {
    return this._priority
  }

  set priority(aString) {
    this._priority = aString
  }

}

// I create a simple value class for the priority. It has a constructor for the value and a conversion function to return a string.
class Priority {
  constructor(value) {
    this._value = value
  }

  // I prefer using a conversion function (toString) rather than a getter (value) here. For clients of the class, asking for the string representation should feel more like a conversion than getting a property.
  toString() {
    return this._value
  }
}


// client
const orders = [new Order({ id: 'o1', priority: 'high' }), new Order({ id: 'o2', priority: 'high' })]
const highPriorityCount = orders.filter(o => 'high' === o.priority || 'rush' === o.priority).length
