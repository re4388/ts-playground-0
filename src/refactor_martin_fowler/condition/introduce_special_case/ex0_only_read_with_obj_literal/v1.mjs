/**
 * Here is the opening case again—just the same,
 * except this time there is no client that updates the customer:
 */



function isUnknown(arg) {
  return (arg === 'unknown')
}


function createUnknownCustomer() {
  return {
    isUnknown: true // The difference is that this time, the special case is a literal.
  }
}

class Customer {

  get isUnknown() {
    return false
  }

  get name() {
  }

  get billingPlan() {
  }

  set billingPlan(arg) {
  }

  get paymentHistory() {
  }
}

class Site {
  get customer() {
    return this._customer
  }
}


// client1
{
  const aCustomer = site.customer
// ... lots of intervening code ...

  let customerName
  if (isUnknown(aCustomer)) customerName = 'occupant'
  else customerName = aCustomer.name
}

// client2
{
  const plan = (isUnknown(aCustomer)) ?
    registry.billingPlans.basic
    : aCustomer.billingPlan
}


// client 3...
{
  const weeksDelinquent = (isUnknown(aCustomer)) ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear

}


