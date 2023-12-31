class Order {
  constructor(aRecord) {
    this._data = aRecord
  }

  get quantity() {
    return this._data.quantity
  }

  get itemPrice() {
    return this._data.itemPrice
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }


  // This is one of the great benefits of objects—they give you a reasonable amount of context for logic to share other bits of logic and data. For something as simple as this, it doesn’t matter so much, but with a larger class it becomes very useful to call out common hunks of behavior as their own abstractions with their own names to refer to them whenever I’m working with the object.

  get basePrice() {
    return this.quantity * this.itemPrice
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05
  }

  get shipping() {
    return Math.min(this.basePrice * 0.1, 100)
  }
}
