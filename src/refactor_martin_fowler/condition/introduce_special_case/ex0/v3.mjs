/**
 * A utility company installs its services in sites.
 *
 */


// client1
{
  const aCustomer = site.customer
  // 不需要任何 condition了!!
  const customerName = aCustomer.name
}

// client2
{
  const plan = aCustomer.billingPlan
}


// client 3...
{
  aCustomer.billingPlan = newPlan

}

// client 4...
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
}




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


class NullPaymentHistory{
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

class UnknownCustomer {
  get isUnknown() {
    return true
  }

  get name() {
    return 'occupant'
  }

  get billingPlan() {
    return registry.billingPlans.basic
  }

  set billingPlan(arg) {
    /* ignore */
  }

  /**
   * The general rule with a special-case object is that if it needs to return related objects,
   * they are usually special cases themselves. So here I need to create a null payment history.
   */
  get paymentHistory() {
    return new NullPaymentHistory()
  }
}




// 這邊可以調整了
class Site {
  get customer() {
    return (this._customer === 'unknown') ? new UnknownCustomer() : this._customer
    // return this._customer
  }
}

// 然後調整這個函數, all client is not broken
// function isUnknown(arg) {
//   if (!((arg instanceof Customer) || arg instanceof UnknownCustomer))
//     throw new Error(`investigate bad value: <${arg}>`)
//   return arg.isUnknown
// }


