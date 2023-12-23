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
  name: 'Warehouse Unit 15',
  location: 'Malden MA',
  // more site details
  customer: 'unknown'
}



// begin the enrichment by adding an isUnknown property to the customer.
function enrichSite(inputSite) {
  const result = _.cloneDeep(inputSite)

  const unknownCustomer = {
    isUnknown: true,
    name: "occupant",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    }
  };

  if (isUnknown(result.customer)) {
    result.customer = unknownCustomer;
  } else {
    result.customer.isUnknown = false;
  }

  return result;
}



function isUnknown(aCustomer) {
  if (aCustomer === "unknown") {
    return true;
  } else {
    return aCustomer.isUnknown;
  }
}



// client 1...
{

  const rawSite = acquireSiteData()
  const site = enrichSite(rawSite)

  const aCustomer = site.customer
  // ... lots of intervening code ...
  const customerName = aCustomer.name;
}

// client 2...
{
  const plan = aCustomer.billingPlan;

}

// client 3...
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
}
