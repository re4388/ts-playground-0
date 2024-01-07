export function statement(invoice, plays) {




  let result = `Statement for ${invoice.customer}\n`
  let volumeCredits = 0



  // 使用 split loop
  for (let perf of invoice.performances) {
    result += ` ${getPlay(perf).name}: ${usd(getAmount(perf))} (${perf.audience} seats)\n`
  }


  // 使用 slide statement
  let totalAmount = 0
  for (let perf of invoice.performances) {
    totalAmount += getAmount(perf)
  }

  for (let perf of invoice.performances) {
    volumeCredits += Math.max(perf.audience - 30, 0)
    if ('comedy' === getPlay(perf).type) volumeCredits += Math.floor(perf.audience / 5)

  }



  result += `Amount owed is ${usd(totalAmount)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result


  function usd(amount) {
    return new Intl.NumberFormat('en-US',
      { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount/100)
  }

  function getPlay(perf){
    return plays[perf.playID]
  }

  function getAmount(perf) {
    let res = 0
    switch (getPlay(perf).type) {
      case 'tragedy':
        res = 40000
        if (perf.audience > 30) {
          res += 1000 * (perf.audience - 30)
        }
        break
      case 'comedy':
        res = 30000
        if (perf.audience > 20) {
          res += 10000 + 500 * (perf.audience - 20)
        }
        res += 300 * perf.audience
        break
      default:
        throw new Error(`unknown type: ${getPlay(perf).type}`)
    }
    return res
  }
}






