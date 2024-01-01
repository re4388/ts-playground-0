/**
 * 一樣的例子
 * 這次沒有 client 需要 update, 因此我們可以用 object literal 處理
 */


// 把字串判斷的邏輯先收到這邊統一管理
function isUnknown(arg) {
  return (arg === 'unknown')
}


// 這次我們不需要建立 class 管理，因此只會讀, 我們可以用 obj literal管理
function createUnknownCustomer() {
  return {
    isUnknown: true // The difference is that this time, the special case is a literal.
  }
}

class Customer {

  get isUnknown() {
    return false
  }

  get name() {
  }

  get billingPlan() {
  }

  set billingPlan(arg) {
  }

  get paymentHistory() {
  }
}

class Site {
  get customer() {
    return this._customer
  }
}


// client1
{
  const aCustomer = site.customer
// ... lots of intervening code ...

  let customerName
  if (isUnknown(aCustomer)) customerName = 'occupant'
  else customerName = aCustomer.name
}

// client2
{
  const plan = (isUnknown(aCustomer)) ?
    registry.billingPlans.basic
    : aCustomer.billingPlan
}


// client 3...
{
  const weeksDelinquent = (isUnknown(aCustomer)) ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear

}


