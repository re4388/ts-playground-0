const readingData = { customer: 'ivan', quantity: 10, month: 5, year: 2017 }


// Code in various places calculates various consequences of this tea usage. One such calculation is the base monetary amount that’s used to calculate the charge for the customer.

// client 1...
const aReading = acquireReading()
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity


// client 2...
const aReading = acquireReading()
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity)
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year))


// Looking through this code, I see these calculations repeated in several places. Such duplication is asking for trouble when they need to change (and I’d bet it’s “when” not “if”). I can deal with this repetition by using Extract Function (106) on these calculations, but such functions often end up scattered around the program making it hard for future developers to realize they are there. Indeed, looking around I discover such a function, used in another area of the code.

// client 3...
const aReading = acquireReading()
const basicChargeAmount = calculateBaseCharge(aReading)

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity
}


// One way of dealing with this is to move all of these derivations into a transfor- mation step that takes the raw reading and emits a reading enriched with all the common derived results.
// I begin by creating a transformation function that merely copies the input object.

// When I’m applying a transformation that produces essentially the same thing but with additional information, I like to name it using “enrich”. If it were producing something I felt was different, I would name it using “transform”.

function enrichReading(original) {
  const result = _.cloneDeep(original)
  return result
}
