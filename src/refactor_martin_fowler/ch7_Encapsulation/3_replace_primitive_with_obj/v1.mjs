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


// client
const orders = [new Order({ id: 'o1', priority: 'high' }), new Order({ id: 'o2', priority: 'high' })]
const highPriorityCount = orders.filter(o => 'high' === o.priority || 'rush' === o.priority).length
