class Order {
  constructor(data) {
    this.priority = data.priority
    // more initialization
  }

}


// client
const orders = [new Order({ id: 'o1', priority: 'high' }), new Order({ id: 'o2', priority: 'high' })]
const highPriorityCount = orders.filter(o => 'high' === o.priority || 'rush' === o.priority).length
