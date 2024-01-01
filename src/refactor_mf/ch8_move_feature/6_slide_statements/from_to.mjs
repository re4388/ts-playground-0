// from

const pricingPlan = retrievePricingPlan()
const order = retreiveOrder()
let charge
const chargePerUnit = pricingPlan.unit


// to

const pricingPlan = retrievePricingPlan()
const chargePerUnit = pricingPlan.unit
const order = retreiveOrder()
let charge


/**
 * why
 *
 * Code is easier to understand when things that are related to each other appear together.
 *
 * If several lines of code access the same data structure, it’s best for them to be together rather than intermingled with code accessing other data structures.
 *
 * At its simplest, I use Slide Statements to keep such code together.
 *
 * A very common case of this is declaring and using variables. Some people like to declare all their variables at the top of a function. I prefer to declare the variable just before I first use it.
 *
 * Usually, I move related code together as a preparatory step for another refactoring, often an Extract Function (106). Putting related code into a clearly separated function is a better separation than just moving a set of lines together, but I can’t do the Extract Function (106) unless the code is together in the first place.
 *
 *
 *
 * 延伸閱讀：
 * https://www.industriallogic.com/blog/swap-statement-refactoring/
 */
