// I want to control how it’s manipulated. I can do this by replacing the record with a class


class Organization {
  constructor(data) {
    this._data = data
  }

  set name(aString) {
    this._data.name = aString
  }

  get name() {
    return this._data.name
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

