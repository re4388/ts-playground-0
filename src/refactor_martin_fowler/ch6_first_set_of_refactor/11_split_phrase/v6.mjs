// discount 無關，我也想要抓出來一個 phrase
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity)
  const priceAddShippingCost =  applyShipping(priceData, basePrice, shippingMethod)
  return applyDiscount(priceAddShippingCost,product, quantity )
}

function applyDiscount(price, product, quantity) {
  return price -  Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate
}

function calculatePricingData(product, quantity) {
  return {
    basePrice: product.basePrice * quantity,
    quantity
  }
}


function applyShipping(priceData, shippingMethod) {
  const { basePrice, quantity } = priceData
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold)
    ? shippingMethod.discountedFee
    : shippingMethod.feePerCase
  return basePrice + quantity * shippingPerCase
}


export {}
