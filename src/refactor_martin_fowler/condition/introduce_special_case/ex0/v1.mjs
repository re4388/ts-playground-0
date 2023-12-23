/**
 * A utility company installs its services in sites.
 *
 */


class Customer {
  get name() {
  }

  get isUnknown() {
    return false
  }

  get billingPlan() {
  }

  set billingPlan(arg) {
  }

  get paymentHistory() {
  }
}



// 建立這個來先讓下面的 client 來替換
function isUnknown(arg) {
  if (!((arg instanceof Customer) || (arg === 'unknown')))
    throw new Error(`investigate bad value: <${arg}>`)
  return (arg === 'unknown')
}

class UnknownCustomer {
  get isUnknown() {
    return true
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
  if (isUnknown(aCustomer))
    customerName = 'occupant'
  else customerName = aCustomer.name
}

// client2
{
  const plan = (isUnknown(aCustomer)) ?
    registry.billingPlans.basic
    : aCustomer.billingPlan;
}


// client 3...
{
  if (!isUnknown(aCustomer))
    aCustomer.billingPlan = newPlan;

}

// client 4...
{
  const weeksDelinquent = (isUnknown(aCustomer)) ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}

