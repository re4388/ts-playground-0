class Customer {
  constructor(name, discountRate) {
    this._name = name
    this._discountRate = discountRate
    this._contract = new CustomerContract(dateToday())
  }

  get discountRate() {
    return this._discountRate
  }

  becomePreferred() {
    this._discountRate += 0.03
    // other nice things


  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

// I want to move the discount rate field from the customer to the customer contract.
// The first thing I need to use is Encapsulate Variable (132) to encapsulate access to the discount rate field.

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate
  }
}

////
function dateToday() {
  return new Date()
}

let customer = new Customer('John', 0.05)
