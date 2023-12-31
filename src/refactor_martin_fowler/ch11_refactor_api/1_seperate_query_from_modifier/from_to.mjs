// from
function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce((total, each) => each.amount + total, 0)
  sendBill()
  return result
}

// to

function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0)
}

function sendBill() {
  emailGateway.send(formatBill(customer))
}


/**
 * why
 *
 * It is a good idea to clearly signal the difference between functions with side effects and those without. A good rule to follow is that any function that returns a value should not have observable side effects—the command-query separation [mf-cqs]. Some programmers treat this as an absolute rule. I’m not 100 percent pure on this (as on anything), but I try to follow it most of the time, and it has served me well.
 *
 *
 * If I come across a method that returns a value but also has side effects, I always try to separate the query from the modifier.
 *
 *
 * Note that I use the phrase observable side effects.
 * A common optimization is to cache the value of a query in a field so that repeated calls go quicker. Although this changes the state of the object with the cache, the change is not observable.
 * Any sequence of queries will always return the same results for each query.
 */
