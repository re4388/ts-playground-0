/**
 * 一樣的例子
 * 這次我們用 transform 來管理
 */


// 假設 input 是這樣
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


// 這些是特例...
const otherCase = {
  name: 'Warehouse Unit 15',
  location: 'Malden MA',
  // more site details
  customer: 'unknown'
}


// similar client code that checks for the unknown customer:

// client 1...
{
  const site = acquireSiteData()
  const aCustomer = site.customer
// ... lots of intervening code ...
  let customerName
  if (aCustomer === 'unknown') customerName = 'occupant'
  else customerName = aCustomer.name
}

// client 2...
{
  const plan = (aCustomer === 'unknown') ? registry.billingPlans.basic
    : aCustomer.billingPlan

}

// client 3...
{
  const weeksDelinquent = (aCustomer === 'unknown') ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear
}
