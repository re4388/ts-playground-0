/**
 * Here is the opening case again—just the same,
 * except this time there is no client that updates the customer:
 */





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
  if (aCustomer === 'unknown') customerName = 'occupant'
  else customerName = aCustomer.name
}

// client2
{
  const plan = (aCustomer === 'unknown') ?
    registry.billingPlans.basic
    : aCustomer.billingPlan
}


// client 3...
{
  const weeksDelinquent = (aCustomer === 'unknown') ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear

}


