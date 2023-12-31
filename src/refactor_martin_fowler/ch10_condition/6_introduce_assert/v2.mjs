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

  set discountRate(aNumber) {
    // 與其在 apply 檢查中做，不如做好 input validation
    assert(null === aNumber || aNumber >= 0)
    this._discountRate = aNumber
  }
}
