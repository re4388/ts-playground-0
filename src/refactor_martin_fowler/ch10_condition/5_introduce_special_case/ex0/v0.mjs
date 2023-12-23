/**
 * A utility company installs its services in sites.
 *
 */


class Customer {
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
  if (aCustomer === 'unknown') {
    customerName = 'occupant'
  } else {
    customerName = aCustomer.name
  }
}

// client2
{
  const plan = (aCustomer === 'unknown') ?
    registry.billingPlans.basic
    : aCustomer.billingPlan
}


// client 3...
{
  if (aCustomer !== 'unknown')
    aCustomer.billingPlan = newPlan

}

// client 4...
{
  const weeksDelinquent = (aCustomer === 'unknown') ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear
}

