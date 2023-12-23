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


function isUnknown(aCustomer) {
  return aCustomer === "unknown";
}

function enrichSite(inputSite) {
  return _.cloneDeep(inputSite)
}


// My first step is to run the site data structure through a transform that, currently, does nothing but a deep copy.
// client 1...
{

  const rawSite = acquireSiteData()
  const site = enrichSite(rawSite)

  const aCustomer = site.customer
// ... lots of intervening code ...
  let customerName
  if (isUnknown(aCustomer)) customerName = 'occupant'
  else customerName = aCustomer.name
}

// client 2...
{
  const plan = (isUnknown(aCustomer)) ? registry.billingPlans.basic
    : aCustomer.billingPlan

}

// client 3...
{
  const weeksDelinquent = (isUnknown(aCustomer)) ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear
}
