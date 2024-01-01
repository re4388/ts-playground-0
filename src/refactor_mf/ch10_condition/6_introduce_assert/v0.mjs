/*
* A customer can be given a discount rate to apply to all their purchases:
* */

class Customer {
  applyDiscount(aNumber) {
    // There’s an assumption here that the discount rate is a positive number.
    return (this.discountRate)
      ? aNumber - (this.discountRate * aNumber)
      : aNumber
  }
}
