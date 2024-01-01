
const readingData = { customer: 'ivan', quantity: 10, month: 5, year: 2017 }


// Code in various places calculates various consequences of this tea usage. One such calculation is the base monetary amount that’s used to calculate the charge for the customer.

// client 1...
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const baseCharge = aReading.baseCharge


// client 2...
const aReading = acquireReading()
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

// One big problem with an enriched reading like this is: What happens should a client change a data value?
// Changing, say, the quantity field would result in data that’s inconsistent.
// To avoid this in JavaScript, my best option is to use Combine Functions into Class (144) instead.
// If I’m in a language with immutable data structures, I don’t have this problem, so its more common to see transforms in those languages.
// But even in languages without immutability, I can use transforms if the data appears in a read-only context, such as deriving data to display on a web page.


// Looking through this code, I see these calculations repeated in several places. Such duplication is asking for trouble when they need to change (and I’d bet it’s “when” not “if”). I can deal with this repetition by using Extract Function (106) on these calculations, but such functions often end up scattered around the program making it hard for future developers to realize they are there. Indeed, looking around I discover such a function, used in another area of the code.

// client 3...
const rawReading = acquireReading()
const aReading = enrichReading(rawReading)
const basicChargeAmount = aReading.baseCharge

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity
}


function enrichReading(original) {
  let result = _.cloneDeep(original)
  // Within the transformation function, I’m happy to mutate a result object, instead of copying each time. I like immutability, but most common languages make it difficult to work with. I’m prepared to go through the extra effort to support
  // it at boundaries, but will mutate within smaller scopes. I also pick my names (using aReading as the accumulating variable) to make it easier to move the code into the transformer function.
  result.baseCharge = calculateBaseCharge(result)
  result.taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year))
  return result
}


// One trap to beware of here. When I write enrichReading like this, to return the enriched reading, I’m implying that the original reading record isn’t changed. So it’s wise for me to add a test.
