// I want to change “name” to “title”. The object is widely used in the code base, and there are updates to the title in the code. So my first move is to apply Encapsulate Record (162).

class Organization {
  constructor(data) {
    // 先改內部， client no effect
    this._title = data.name
    this._country = data.country
  }

  get name() {
    return this._title
  }

  set name(aString) {
    this._title = aString
  }

  get country() {
    return this._country
  }

  set country(aCountryCode) {
    this._country = aCountryCode
  }
}

const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' })
