function printOwing(invoice) {
  let outstanding = 0
  printBanner()
// calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount
  }
  recordDueDate(invoice)
  printDetails(invoice, outstanding)
}


function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`)
}

function recordDueDate(invoice) {
  const today = Clock.today
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
}
