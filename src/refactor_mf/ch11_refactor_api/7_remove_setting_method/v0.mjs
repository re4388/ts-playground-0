class Person {
  get name() {
    return this._name
  }

  set name(arg) {
    this._name = arg
  }

  get id() {
    return this._id
  }

  set id(arg) {
    this._id = arg
  }
}


// At the moment, I create a new object with code like this:
const martin = new Person()
martin.name = 'martin'
martin.id = '1234'

// The name of a person may change after it’s created, but the ID does not. To make this clear, I want to remove the setting method for ID.
