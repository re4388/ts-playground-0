export function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0


  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format



  for (let perf of invoice.performances) {
    const play = plays[perf.playID]

    // method extraction, 把 amount 這邊整個拉出去
    let thisAmount = getAmount(plays, perf)

    volumeCredits += Math.max(perf.audience - 30, 0)
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5)
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`
    totalAmount += thisAmount
  }



  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}


function getAmount(plays, perf) {
  const play = plays[perf.playID]
  let res = 0
  switch (play.type) {
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
      throw new Error(`unknown type: ${play.type}`)
  }
  return res
}






