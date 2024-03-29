const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 }


//   client 1...
const aReading = acquireReading()
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity


// client 2...
const aReading = acquireReading()
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity)
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))

// client 3...
const aReading = acquireReading()
const basicChargeAmount = calculateBaseCharge(aReading)

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity
}

// To turn the record into a class, I use Encapsulate Record (162).
class Reading {
  constructor(data) {
    this._customer = data.customer
    this._quantity = data.quantity
    this._month = data.month
    this._year = data.year
  }

  get customer() {
    return this._customer
  }

  get quantity() {
    return this._quantity
  }

  get month() {
    return this._month
  }

  get year() {
    return this._year
  }


}
