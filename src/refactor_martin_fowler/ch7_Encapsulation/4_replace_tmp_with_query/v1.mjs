class Order {
  constructor(quantity, item) {
    this._quantity = quantity
    this._item = item
  }

  get price() {
    // I make it const and run tests. This is a good way of checking that I haven’t missed a reassignment
    const basePrice = this._quantity * this._item.price
    var discountFactor = 0.98
    if (basePrice > 1000) {
      discountFactor -= 0.03
    }
    return basePrice * discountFactor
  }
}

//I want to replace the temps basePrice and discountFactor with methods.
