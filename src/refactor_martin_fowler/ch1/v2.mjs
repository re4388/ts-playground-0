export function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format



  for (let perf of invoice.performances) {

    // replace tmp with query
    // 用 fn 的方法 取代 暫時變數
    // getAmount 就不用傳進去了
    let thisAmount = getAmount(perf)

    volumeCredits += Math.max(perf.audience - 30, 0)
    if ('comedy' === getPlay(perf).type) volumeCredits += Math.floor(perf.audience / 5)
    result += ` ${getPlay(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`
    totalAmount += thisAmount
  }



  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result

  function getPlay(perf){
    return plays[perf.playID]
  }

  function getAmount(perf) {
    let res = 0

    // 使用 inline variable
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






