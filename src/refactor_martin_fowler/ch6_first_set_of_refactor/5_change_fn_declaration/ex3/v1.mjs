// I have a function which determines if a customer is based in New England.



// caller...
const newEnglanders = someCustomers.filter(c => inNewEngland(c))
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c))


// With Change Function Declaration, my usual first move is to apply Extract Function (106), but in this case I can make it easier by first refactoring the function body a little. I use Extract Variable (119) on my desired new parameter.
function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode)
}
