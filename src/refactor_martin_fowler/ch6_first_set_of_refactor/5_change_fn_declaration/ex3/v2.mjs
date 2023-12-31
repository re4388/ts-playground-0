// I have a function which determines if a customer is based in New England.



// caller...
const newEnglanders = someCustomers.filter(c => inNewEngland(c))
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c))


// Now I use Extract Function (106) to create that new function.
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state
  return xxNEWinNewEngland(stateCode)
}

// use temp name first
function xxNEWinNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode)
}
