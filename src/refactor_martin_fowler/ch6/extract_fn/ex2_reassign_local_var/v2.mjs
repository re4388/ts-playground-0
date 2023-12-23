function printOwing(invoice) {
  printBanner()

  const outstanding = calculateOutstanding(invoice)

  recordDueDate(invoice)
  printDetails(invoice, outstanding)
}

function calculateOutstanding(invoice) {
  let res = 0;
  for (const o of invoice.orders) {
    res += o.amount; }
  return res;
}
