
class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`
  }

  get trackingInformation() {
    return this._trackingInformation
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg
  }

  set shippingCompany(arg) {
    this.shippingCompany = arg
  }

  get shippingCompany() {
    return this._shippingCompany
  }
}


// caller
// aShipment.trackingInformation.shippingCompany = request.vendor
aShipment.shippingCompany = request.vendor
