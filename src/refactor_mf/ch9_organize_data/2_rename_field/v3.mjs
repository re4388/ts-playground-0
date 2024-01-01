// I want to change “name” to “title”. The object is widely used in the code base, and there are updates to the title in the code. So my first move is to apply Encapsulate Record (162).

class Organization {

  constructor(data) {
    // add support for using “title” in the constructor.
    this._title = (data.title !== undefined) ? data.title : data.name
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

// Now, callers of my constructor can use either name or title (with title taking precedence). I can now go through all constructor callers and change them one-by-one to use the new name.
const organization = new Organization({ name: 'Acme Gooseberries2', country: 'CHINA' })
const organization = new Organization({ title: 'Acme Gooseberries', country: 'GB' })
