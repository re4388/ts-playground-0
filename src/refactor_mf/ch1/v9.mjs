export function statement(invoice, plays) {
  return renderPlaintText(createStatementData(invoice, plays))

  // 把 enrich 的邏輯特別拉出一個函數
  function createStatementData(invoice, plays) {
    const data = {}
    data.customer = invoice.customer
    data.performances = invoice.performances.map(enrichPerformance)
    data.totalAmount = totalAmount(data)
    data.totalVolumeCredits = totalVolumeCredits(data)

    return data
  }


  function enrichPerformance(aPerf) {
    const aPerfCopy = Object.assign({}, aPerf)
    aPerfCopy.play = getPlay(aPerfCopy)
    aPerfCopy.amount = getAmount(aPerfCopy)
    aPerfCopy.volumeCredits = volumeCreditsFor(aPerfCopy)

    return aPerfCopy
  }


  function totalVolumeCredits(data) {
    let res = 0
    for (let perf of data.performances) {
      res += perf.volumeCredits
    }

    return res
  }


  function totalAmount(data) {
    let res = 0
    for (let perf of data.performances) {
      res += perf.amount
    }

    return res
  }


  function volumeCreditsFor(perf) {
    let res = 0
    res += Math.max(perf.audience - 30, 0)
    if ('comedy' === perf.play.type) res += Math.floor(perf.audience / 5)
    return res
  }


  function getAmount(perf) {
    let res = 0
    switch (perf.play.type) {
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

  function getPlay(aPerf) {
    return plays[aPerf.playID]
  }

}


function renderPlaintText(data, plays) {
  let res = `Statement for ${data.customer}\n`

  for (let perf of data.performances) {
    res += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
  }

  res += `Amount owed is ${usd(data.totalAmount)}\n`
  res += `You earned ${data.totalVolumeCredits} credits\n`
  return res


  function usd(amount) {
    return new Intl.NumberFormat('en-US',
      { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount / 100)
  }


}






