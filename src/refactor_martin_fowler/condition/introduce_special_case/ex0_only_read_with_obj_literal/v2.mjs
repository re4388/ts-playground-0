/**
 * Here is the opening case again—just the same,
 * except this time there is no client that updates the customer:
 */

// client1
{
  const aCustomer = site.customer
// ... lots of intervening code ...
  const customerName = aCustomer.name
}

// client2
{
  const plan = aCustomer.billingPlan;
}


// client 3...
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;

}



function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    },
  }
}


class Site {
  get customer() {
    return (this._customer === 'unknown') ? createUnknownCustomer() : this._customer
  }
}



