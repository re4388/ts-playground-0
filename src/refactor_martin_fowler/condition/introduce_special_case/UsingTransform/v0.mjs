const inputRecord = {
  name: 'Acme Boston',
  location: 'Malden MA',
  // more...
  customer: {
    name: 'Acme Industries',
    billingPlan: 'plan-451',
    paymentHistory: {
      weeksDelinquentInLastYear: 7
      //more...
    }
  //more...
  }
}


// In some cases, the customer isn’t known
const otherCase = {
  name: "Warehouse Unit 15",
  location: "Malden MA",
  // more site details
  customer: "unknown",
}



// similar client code that checks for the unknown customer:

// client 1...
{
  const site = acquireSiteData();
  const aCustomer = site.customer;
// ... lots of intervening code ...
  let customerName;
  if (aCustomer === "unknown") customerName = "occupant"; else customerName = aCustomer.name;
}

// client 2...
{const plan = (aCustomer === "unknown") ? registry.billingPlans.basic
  : aCustomer.billingPlan;

}

// client 3...
{
  const weeksDelinquent = (aCustomer === "unknown") ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
