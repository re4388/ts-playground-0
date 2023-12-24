
// While this class may have been worthwhile in the past, I no longer feel it’s pulling its weight, so I want to inline it into Shipment.
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany
  }

  set shippingCompany(arg) {
    this._shippingCompany = arg
  }

  get trackingNumber() {
    return this._trackingNumber
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg
  }

  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`
  }
}


class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display
  }

  get trackingInformation() {
    return this._trackingInformation
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation
  }
}


// caller
aShipment.trackingInformation.shippingCompany = request.vendor;
