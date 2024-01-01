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


// 由 site 源頭去判斷, 出去的 customer 就已經分好了!
class Site {
  get customer() {
    return (this._customer === 'unknown') ? new UnknownCustomer() : this._customer
    // return this._customer
  }
}

class NullPaymentHistory{
  get weeksDelinquentInLastYear() {
    return 0;
  }
}


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



// // 改為由 Customer 的 instance 判斷
// function isUnknown(arg) {
//   if (
//     (arg instanceof UnknownCustomer) ||
//     !(arg instanceof Customer)
//   ) {
//     throw new Error(`investigate bad value: <${arg}>`)
//   }
//
//   return arg.isUnknown
// }




// 建立 UnknownCustomer class
class UnknownCustomer {
  get isUnknown() {
    return true
  }
  // 把邏輯都移到 UnknownCustomer了!!
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
