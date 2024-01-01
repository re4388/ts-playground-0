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

  const rawSite = acquireSiteData()
  const site = enrichSite(rawSite)

  const aCustomer = site.customer
  // ... lots of intervening code ...
  // 判斷移到 enrichSite 了
  const customerName = aCustomer.name
}

// client 2...
{
  const plan = aCustomer.billingPlan

}

// client 3...
{
  const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear
}


// begin the enrichment by adding an isUnknown property to the customer.
function enrichSite(inputSite) {
  const result = _.cloneDeep(inputSite)

  const unknownCustomer = {
    isUnknown: true,
    name: 'occupant',
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0
    }
  }

  if (isUnknown(result.customer)) {
    result.customer = unknownCustomer
  } else {
    result.customer.isUnknown = false
  }

  return result
}

// 建立 helper
function isUnknown(aCustomer) {
  if (aCustomer === 'unknown') {
    return true
  } else {
    return aCustomer.isUnknown
  }
}
