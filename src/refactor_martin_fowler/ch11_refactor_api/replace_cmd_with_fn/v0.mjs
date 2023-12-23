/**
 * Command objects provide a powerful mechanism for handling complex computations.
 *
 * They can easily be broken down into separate methods sharing common state through the fields;
 * they can be invoked via different methods for different effects;
 * they can have their data built up in stages.
 *
 * But that power comes at a cost.
 * Most of the time, I just want to invoke a function and have it do its thing.
 * If that’s the case, and the function isn’t too complex,
 * then a command object is more trouble than its worth and should be turned into a regular function.
 */


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
monthCharge = new ChargeCalculator(customer, usage, provider).charge;
