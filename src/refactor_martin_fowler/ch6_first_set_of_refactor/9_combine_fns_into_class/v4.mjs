const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 }


//   client 1...
const aReading = acquireReading()
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity


// client 2...
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
const taxableCharge = aReading.taxableCharge;

function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year))
}


// client 3...
const rawReading = acquireReading()
const aReading = new Reading(rawReading)
const basicChargeAmount = aReading.baseCharge


// Since all the derived data is calculated on demand, I have no problem should I need to update the stored data.
// In general, I prefer immutable data, but many circumstances force us to work with mutable data (such as JavaScript, a language ecosystem that wasn’t designed with immutability in mind).
// When there is a reasonable chance the data will be updated somewhere in the program, then a class is very helpful.

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

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year))
  }


  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity
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
