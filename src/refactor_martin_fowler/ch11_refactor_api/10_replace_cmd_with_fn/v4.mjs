class ChargeCalculator {

  charge(customer, usage, provider) {
    const baseCharge = customer.baseRate * usage
    return baseCharge + provider.connectionCharge
  }
}

// caller
monthCharge = charge(customer, usage, provider)


function charge(customer, usage, provider) {
  return new ChargeCalculator().charge(customer, usage, provider);
}
