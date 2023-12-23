function printOwing(invoice) {
  printBanner()

  // calculate outstanding
  let outstanding = 0
  for (const o of invoice.orders) {
    outstanding += o.amount
  }
  recordDueDate(invoice)
  printDetails(invoice, outstanding)
}
