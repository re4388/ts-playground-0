// there is a sense of two phases going on here. The first couple of lines of code use the product information to calculate the product-oriented price of the order, while the later code uses shipping information to determine the shipping cost.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity


  const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee : shippingMethod.feePerCase

  const shippingCost = quantity * shippingPerCase

  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate

  const price = basePrice - discount + shippingCost

  return price
}
