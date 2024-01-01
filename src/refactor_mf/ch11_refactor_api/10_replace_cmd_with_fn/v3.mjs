class ChargeCalculator {
  constructor(customer, usage, provider) {
    this._customer = customer
    this._usage = usage
    this._provider = provider
  }


  charge(customer, usage, provider) {
    const baseCharge = this._customer.baseRate * this._usage
    return baseCharge + this._provider.connectionCharge
  }
}

// caller
monthCharge = charge(customer, usage, provider)


function charge(customer, usage, provider) {
  return new ChargeCalculator(customer, usage, provider)
    .charge(customer, usage, provider);
}
