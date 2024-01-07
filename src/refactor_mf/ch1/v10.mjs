// 把資料處理和資料顯示分開, 可以有兩種不同的顯示邏輯， renderHtml and renderPlaintText

export function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}


function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`
  result += '<table>\n'
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`
    result += `<td>${usd(perf.amount)}</td></tr>\n`
  }
  result += '</table>\n'
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`
  return result
}

/////////////////////////////

export function statement(invoice, plays) {
  return renderPlaintText(createStatementData(invoice, plays))
}


function renderPlaintText(data) {
  let res = `Statement for ${data.customer}\n`

  for (let perf of data.performances) {
    res += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
  }

  res += `Amount owed is ${usd(data.totalAmount)}\n`
  res += `You earned ${data.totalVolumeCredits} credits\n`
  return res
}


function createStatementData(invoice, plays) {
  const data = {}
  data.customer = invoice.customer
  data.performances = invoice.performances.map(enrichPerformance)
  data.totalAmount = totalAmount(data)
  data.totalVolumeCredits = totalVolumeCredits(data)

  return data

  function getPlay(aPerf) {
    return plays[aPerf.playID]
  }


  function enrichPerformance(aPerf) {
    const res = Object.assign({}, aPerf)
    res.play = getPlay(res)
    res.amount = getAmount(res)
    res.volumeCredits = volumeCreditsFor(res)

    return res
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
}


function usd(amount) {
  return new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount / 100)
}





