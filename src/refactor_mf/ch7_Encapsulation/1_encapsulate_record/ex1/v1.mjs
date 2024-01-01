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


// To encapsulate this data, I also start with Encapsulate Variable (132)
function getRawDataOfCustomers() {
  return customerData
}


// With more nested data, reads and writes can be digging into the data structure.



// client usage:
// sample update...
getRawDataOfCustomers()[customerID].usages[year][month] = amount


// sample read...
function compareUsage(customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month]
  const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month]
  return {
    laterAmount: later,
    change: later - earlier
  }
}



