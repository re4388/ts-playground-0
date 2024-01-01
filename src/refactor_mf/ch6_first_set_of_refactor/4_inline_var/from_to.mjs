// from

function a1() {
  let basePrice = anOrder.basePrice
  return (basePrice > 1000)

}

// to
function a2() {
  return anOrder.basePrice > 1000
}

/**
 * why
 *
 * inverse of: Extract Variable (119)
 *
 * Variables provide names for expressions within a function, and as such they are usually a Good Thing.
 *
 * But sometimes, the name doesn’t really communicate more than the expression itself.
 * At other times, you may find that a variable gets in the way of refactoring the neighboring code.
 * In these cases, it can be useful to inline the variable.
 */
