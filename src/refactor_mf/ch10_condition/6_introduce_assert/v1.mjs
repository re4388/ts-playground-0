/*
* A customer can be given a discount rate to apply to all their purchases:
* */

class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) {
      return aNumber
    } else {
      assert(this.discountRate >= 0)
      return aNumber - (this.discountRate * aNumber)
    }
  }
}
