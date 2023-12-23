
// I want to control how it’s manipulated. I can do this by replacing the record with a class




class Organization {
  constructor(data) {
    this._data = data
  }
}

const organization = new Organization({
  name: 'Acme Gooseberries',
  country: 'GB'
})

function getRawDataOfOrganization() {
  return organization._data
}

// client1
let result = 0
result += `<h1>${getRawDataOfOrganization().name}</h1>`


// client2
getRawDataOfOrganization().name = newName

