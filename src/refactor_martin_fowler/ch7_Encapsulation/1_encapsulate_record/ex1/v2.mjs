const customerData = {
  '1920': {
    name: 'martin',
    id: '1920',
    usages: {
      '2016': {
        '1': 50,
        '2': 55
        // remaining months of the year
      },
      '2015': {
        '1': 70,
        '2': 63
        // remaining months of the year
      }
    }
  },
  '38673': {
    name: 'neal',
    id: '38673'
    // more customers in a similar form
  }
}

// I then make a class for the overall data structure.
class CustomerData {
  constructor(data) {
    this._data = data
  }

  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount
  }

  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month]
  }

}


// factory fn
function getCustomerData() {
  return new CustomerData(customerData)
}





// With more nested data, reads and writes can be digging into the data structure.



// client usage:
// sample update...
getCustomerData().setUsage(customerID, year, month, amount)
// setUsage(customerID, year, month, amount)

// sample read...
function compareUsage(customerID, laterYear, month) {
  const later = getCustomerData().usage(customerID, laterYear, month)
  const earlier = getCustomerData().usage(customerID, laterYear - 1, month)
  return { laterAmount: later, change: later - earlier }
}



