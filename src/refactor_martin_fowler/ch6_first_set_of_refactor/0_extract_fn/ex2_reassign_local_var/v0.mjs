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
