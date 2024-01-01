/**
 * 一樣的例子
 * 這次沒有 client 需要 update, 因此我們可以用 object literal 處理
 */

// 過渡不需要了
// // 把字串判斷的邏輯先收到這邊統一管理
// function isUnknown(arg) {
//   return (arg === 'unknown')
// }



// 這次我們不需要建立 class 管理，因此只會讀, 我們可以用 obj literal管理
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
    return (this._customer === 'unknown') ? createUnknownCustomer() : this._customer
  }
}


// client 不需要判斷了!!

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
