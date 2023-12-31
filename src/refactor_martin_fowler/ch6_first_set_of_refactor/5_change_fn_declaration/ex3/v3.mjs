// I have a function which determines if a customer is based in New England.



// 開始改 callers...... 改的過程中，新的舊的都不會掛

// 改好的
const newEnglanders = someCustomers.filter(c => xxNEWinNewEngland(c.address.state));

// 還沒改好的
const newEnglanders2 = someCustomers.filter(c => inNewEngland(c));



// 同時支援的階段!
// 舊的包著新的
function inNewEngland(aCustomer) {
  return xxNEWinNewEngland(aCustomer.address.state);
}


// 新的
function xxNEWinNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode)
}
