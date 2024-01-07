// from

function a1() {
  const basePrice = this._quantity * this._itemPrice
  if (basePrice > 1000)
    return basePrice * 0.95
  else
    return basePrice * 0.98
}

// to

function a2() {
  if (this.getPrice() > 1000)
    return this.basePrice * 0.95
  else
    return this.basePrice * 0.98
}

function getPrice() {
  return this._quantity * this._itemPrice
}


/**
 * why?
 *
 *
 * While using a variable is handy, it can often be worthwhile to go a step further and use a function instead.
 *
 * If I’m working on breaking up a large function, turning variables into their own functions makes it easier to extract parts of the function,
 * since I no longer need to pass in variables into the extracted functions.
 *
 * Whenever I see variables calculated in the same way in different places, I look to turn them into a single function.
 *
 * This refactoring works best if I’m inside a class, since the class provides a shared context for the methods I’m extracting.
 * Outside of a class, I’m liable to have too many parameters in a top-level function which negates much of the benefit of using a function.
 * Nested functions can avoid this, but they limit my ability to share the logic between related functions.
 *
 *
 * Only some temporary variables are suitable for Replace Temp with Query. The variable needs to be calculated once and then only be read afterwards.
 *
 *
 */
