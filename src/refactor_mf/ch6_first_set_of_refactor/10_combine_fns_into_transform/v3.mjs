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
const rawReading = acquireReading()
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading)

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity
}



function enrichReading(original) {
  let result = _.cloneDeep(original)
  // Within the transformation function, I’m happy to mutate a result object, instead of copying each time. I like immutability, but most common languages make it difficult to work with. I’m prepared to go through the extra effort to support
  // it at boundaries, but will mutate within smaller scopes. I also pick my names (using aReading as the accumulating variable) to make it easier to move the code into the transformer function.
  result.baseCharge = calculateBaseCharge(result)
  return result
}
