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

  /**
   * But the problem with this is that there’s no way to prevent clients from modifying the data directly,
   * which breaks the whole point of encapsulating all the updates inside functions.
   *
   * Consequently, the simplest thing to do is to provide a copy of the underlying data, using the rawData method I wrote earlier.
   */
  get rawData() {
    return _.cloneDeep(this._data);
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
  const later = getCustomerData().rawData[customerID].usage(customerID, laterYear, month)
  const earlier = getCustomerData().rawData[customerID].usage(customerID, laterYear - 1, month)
  return { laterAmount: later, change: later - earlier }
}



