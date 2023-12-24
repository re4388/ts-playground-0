// from

function printOwing(invoice) {
  printBanner()
  let outstanding = calculateOutstanding()

  
  //print details
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
}

// to

function printOwing(invoice) {
  printBanner()
  let outstanding = calculateOutstanding()
  printDetails(outstanding)

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${outstanding}`)
  }


}
