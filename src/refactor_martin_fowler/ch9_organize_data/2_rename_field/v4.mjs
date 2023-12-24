// I want to change “name” to “title”. The object is widely used in the code base, and there are updates to the title in the code. So my first move is to apply Encapsulate Record (162).

class Organization {

  constructor(data) {
    // Once I’ve done all of them, I can remove the support for the name.
    this._title = data.title;
    this._country = data.country
  }

  get title() {
    return this._title
  }

  set title(aString) {
    this._title = aString
  }

  get country() {
    return this._country
  }

  set country(aCountryCode) {
    this._country = aCountryCode
  }
}

const organization = new Organization({ title: 'Acme Gooseberries', country: 'GB' })
