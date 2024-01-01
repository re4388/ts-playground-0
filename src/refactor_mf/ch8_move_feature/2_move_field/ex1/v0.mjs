class Account {
  constructor(number, type, interestRate) {
    this._number = number
    this._type = type
    this._interestRate = interestRate
  }

  get interestRate() {
    return this._interestRate
  }

}

class AccountType {
  constructor(nameString) {
    this._name = nameString
  }
}

// I want to change things so that an account’s interest rate is determined from its account type.
// The access to the interest rate is already nicely encapsulated,
// so I’ll just create the field and an appropriate accessor on the account type.
