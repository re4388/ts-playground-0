/**
 * A utility company installs its services in sites.
 *
 */






class Customer {
  get name() {
  }

  // 建立一個處理 unknown 的 getter
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

// 改為由 Customer 的 instance 判斷
function isUnknown(arg) {
  if (
    (arg instanceof UnknownCustomer) ||
    !(arg instanceof Customer)
  ) {
    throw new Error(`investigate bad value: <${arg}>`)
  }

  return arg.isUnknown
}

class UnknownCustomer {
  get isUnknown() {
    return true
  }
}

// 由 site 源頭去判斷, 出去的 customer 就已經分好了!
class Site {
  get customer() {
    return (this._customer === 'unknown') ? new UnknownCustomer() : this._customer
    // return this._customer
  }
}



// client1
{
  const aCustomer = site.customer
// ... lots of intervening code ...

  let customerName
  if (isUnknown(aCustomer)) {
    customerName = 'occupant'
  } else {
    customerName = aCustomer.name
  }
}

// client2
{
  const plan = (isUnknown(aCustomer)) ?
    registry.billingPlans.basic
    : aCustomer.billingPlan
}


// client 3...
{
  if (!isUnknown(aCustomer))
    aCustomer.billingPlan = newPlan

}

// client 4...
{
  const weeksDelinquent = (isUnknown(aCustomer)) ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear
}

