export function statement(invoice, plays) {
  let res = `Statement for ${invoice.customer}\n`

  for (let perf of invoice.performances) {
    res += ` ${getPlay(perf).name}: ${usd(getAmount(perf))} (${perf.audience} seats)\n`
  }

  res += `Amount owed is ${usd(totalAmount())}\n`
  res += `You earned ${volumeCredits()} credits\n`
  return res


  function volumeCredits() {
    let res = 0
    for (let perf of invoice.performances) {
      res += Math.max(perf.audience - 30, 0)
      if ('comedy' === getPlay(perf).type) res += Math.floor(perf.audience / 5)
    }

    return res
  }


  function totalAmount() {
    let res = 0
    for (let perf of invoice.performances) {
      res += getAmount(perf)
    }

    return res
  }


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






