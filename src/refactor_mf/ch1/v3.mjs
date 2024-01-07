export function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0


  let result = `Statement for ${invoice.customer}\n`



  for (let perf of invoice.performances) {
    let amount = getAmount(perf)

// add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0)
// add extra credit for every ten comedy attendees
    if ('comedy' === getPlay(perf).type) volumeCredits += Math.floor(perf.audience / 5)
// print line for this order
    result += ` ${getPlay(perf).name}: ${usd(amount)} (${perf.audience} seats)\n`
    totalAmount += amount
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






