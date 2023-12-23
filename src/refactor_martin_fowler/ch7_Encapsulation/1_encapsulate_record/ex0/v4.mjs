// I want to control how it’s manipulated. I can do this by replacing the record with a class


class Organization {
  constructor(data) {
    this._name = data.name
    this._country = data.country
  }

  set name(aString) {
    this._name = aString
  }

  get name() {
    return this._name
  }

  set country(aString) {
    this._country = aString
  }

  get country() {
    return this._country

  }
}


function getOrganization() {
  return new Organization({
    name: 'Acme Gooseberries',
    country: 'GB'
  })
}

// client1
let result = 0
result += `<h1>${getOrganization().name}</h1>`


// client2
getOrganization().name = newName

