// there is a sense of two phases going on here. The first couple of lines of code use the product information to calculate the product-oriented price of the order, while the later code uses shipping information to determine the shipping cost.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity

  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate


  const price = applyShipping(basePrice, shippingMethod, quantity, discount); return price;
}

// 把算 shipping cost 的逻辑提取出来
function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee
    : shippingMethod.feePerCase
  const shippingCost = quantity * shippingPerCase
  const price = basePrice - discount + shippingCost
  return price
}
