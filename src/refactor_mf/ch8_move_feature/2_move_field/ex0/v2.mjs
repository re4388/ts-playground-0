class Customer {
  constructor(name, discountRate) {
    this._name = name
    this._setDiscountRate(discountRate)
    this._contract = new CustomerContract(dateToday())
  }

  // I use a method to update the discount rate, rather than a property setter,
  // as I don’t want to make a public setter for the discount rate.
  get discountRate() {
    return this._discountRate
  }

  _setDiscountRate(aNumber) {
    this._discountRate = aNumber
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03)
    // other nice things
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate))
  }
}

// I want to move the discount rate field from the customer to the customer contract.
// The first thing I need to use is Encapsulate Variable (132) to encapsulate access to the discount rate field.

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate
    this._discountRate = discountRate
  }

  get discountRate() {
    return this._discountRate
  }

  set discountRate(arg) {
    this._discountRate = arg
  }
}

////
function dateToday() {
  return new Date()
}

let customer = new Customer('John', 0.05)
