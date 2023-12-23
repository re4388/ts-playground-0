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




class UnknownCustomer {
  get isUnknown() {
    return true
  }
}


// 這邊可以調整了
class Site {
  get customer() {
    return (this._customer === "unknown") ? new UnknownCustomer() : this._customer;
    // return this._customer
  }
}

// 然後調整這個函數, all client is not broken
function isUnknown(arg) {
  if (!((arg instanceof Customer) || arg instanceof UnknownCustomer))
    throw new Error(`investigate bad value: <${arg}>`)
  return arg.isUnknown
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

