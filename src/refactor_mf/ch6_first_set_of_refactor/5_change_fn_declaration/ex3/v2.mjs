// I have a function which determines if a customer is based in New England.



// caller...
const newEnglanders = someCustomers.filter(c => inNewEngland(c))
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c))


// Now I use Extract Function (106) to create that new function.
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state
  return inNewEnglandV1(stateCode)
}

// use temp name first
function inNewEnglandV1(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode)
}
