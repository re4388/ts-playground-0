// from

class A1 {
  get discountedTotal() {
    return this._discountedTotal
  }

  set discount(aNumber) {
    const old = this._discount
    this._discount = aNumber
    this._discountedTotal += old - aNumber
  }

}


// to

class A2 {
  get discountedTotal() {
    return this._baseTotal - this._discount
  }

  set discount(aNumber) {
    this._discount = aNumber
  }
}

