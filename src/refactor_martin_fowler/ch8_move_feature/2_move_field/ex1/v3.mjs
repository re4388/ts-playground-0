class Account {
  constructor(number, type, interestRate) {
    this._number = number
    this._type = type

    // I might run the system for a while with this assertion in place to see if I get an error.
    // Or, instead of adding an assertion, I might log the problem.


    assert(interestRate === this._type.interestRate)
    this._interestRate = interestRate
  }

  // Once I’m confident that I’m not introducing an observable change, I can change the access, removing the update from the account completely.
  get interestRate() {
    return this._type.interestRate
  }

}

class AccountType {
  constructor(nameString, interestRate) {
    this._name = nameString
    this._interestRate = interestRate
  }

  get interestRate() {
    return this._interestRate
  }
}

