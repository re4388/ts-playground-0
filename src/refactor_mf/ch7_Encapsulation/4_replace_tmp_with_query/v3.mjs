class Order {
  constructor(quantity, item) {
    this._quantity = quantity
    this._item = item
  }

  // apply Inline Variable (123).
  get price() {
    var discountFactor = 0.98
    if (this.basePrice > 1000) {
      discountFactor -= 0.03
    }
    return this.basePrice * discountFactor
  }

  get basePrice() {
    return this._quantity * this._item.price; }
}

//I want to replace the temps basePrice and discountFactor with methods.
