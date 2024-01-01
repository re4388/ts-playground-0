// from



function a1() {
  return order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100)
}

// to

function a2() {
  const basePrice = order.quantity * order.itemPrice
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
  const shipping = Math.min(basePrice * 0.1, 100)
  return basePrice - quantityDiscount + shipping
}




/**
 * why
 *
 * inverse of: Inline Variable (123)
 *
 *
 * Expressions can become very complex and hard to read. In such situations, local variables may help break the expression down into something more manageable. In particular, they give me an ability to name a part of a more complex piece of logic.
 * This allows me to better understand the purpose of what’s happening.
 *
 *
 * Such variables are also handy for debugging, since they provide an easy hook for a debugger or print statement to capture.
 * If I’m considering Extract Variable, it means I want to add a name to an expression in my code. Once I’ve decided I want to do that, I also think about the context of that name. If it’s only meaningful within the function I’m working on, then Extract Variable is a good choice — but if it makes sense in a broader context, I’ll consider making the name available in that broader context, usually as a function.
 *
 * If the name is available more widely, then other code can use that expression without having to repeat the expression, leading to less duplication and a better statement of my intent.
 *
 * The downside of promoting the name to a broader context is extra effort. If it’s significantly more effort, I’m likely to leave it till later when I can use Replace Temp with Query (178).
 *
 * But if it’s easy, I like to do it now so the name is immediately available in the code. As a good example of this, if I’m working in a class, then Extract Function (106) is very easy to do.
 */
