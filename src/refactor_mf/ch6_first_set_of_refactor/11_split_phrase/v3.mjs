// there is a sense of two phases going on here. The first couple of lines of code use the product information to calculate the product-oriented price of the order, while the later code uses shipping information to determine the shipping cost.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity

  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate

  // I introduce the intermediate data structure that will communicate between the two phases.
  const priceData = {
    basePrice: basePrice
  };

  const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount); return price;
}

// 把算 shipping cost 的逻辑提取出来
function applyShipping(priceData, shippingMethod, quantity, discount) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee
    : shippingMethod.feePerCase
  const shippingCost = quantity * shippingPerCase
  const price = priceData.basePrice - discount + shippingCost
  return price
}
