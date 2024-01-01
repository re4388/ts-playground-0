// I have a function which determines if a customer is based in New England.



// caller...
const newEnglanders = someCustomers.filter(c => inNewEngland(c))
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c))

function inNewEngland(aCustomer) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(aCustomer.address.state)
}




// inNewEngland only uses the customer’s home state to determine if it’s in New England. I’d prefer to refactor inNewEngland so that it takes a state code as a parameter, making it usable in more contexts by removing the dependency on the customer.
