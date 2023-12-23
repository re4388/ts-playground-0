class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer
    this._usage = usage
    this._provider = provider
  }

  get baseCharge() {
    return this._customer.baseRate * this._usage
  }

  get charge() {
    return this.baseCharge + this._provider.connectionCharge
  }
}

// caller
monthCharge = charge(customer, usage, provider)

// begin by using Extract Function (106) to wrap the class creation and invocation.

function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider).charge
}
