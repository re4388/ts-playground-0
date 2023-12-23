class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer
    this._usage = usage
    this._provider = provider
  }

  // how to deal with any supporting functions, in this case baseCharge.
  // My usual approach for a function that returns a value is to first Extract Variable (119) on that value.
  // as a result:
  // I now have all the processing in a single function, so my next step is to move the data passed to the constructor to the main method.
  get charge() {
    const baseCharge = this._customer.baseRate * this._usage
    return baseCharge + this._provider.connectionCharge
  }
}

// caller
monthCharge = charge(customer, usage, provider)

// begin by using Extract Function (106) to wrap the class creation and invocation.

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider).charge
}
