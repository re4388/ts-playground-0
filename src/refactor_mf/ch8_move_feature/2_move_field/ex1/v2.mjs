class Account {
  constructor(number, type, interestRate) {
    this._number = number
    this._type = type
    assert(interestRate === this._type.interestRate);
    this._interestRate = interestRate
  }

  get interestRate() {
    return this._interestRate
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

// But there is a potential problem when I update the accesses from account. Before this refactoring, each account had its own interest rate. Now, I want all accounts to share the interest rates of their account type. If all the accounts of the same type already have the same interest rate, then there’s no change in observable behavior, so I’m fine with the refactoring. But if there’s an account with a different interest rate, it’s no longer a refactoring. If my account data is held in a database, I should check the database to ensure that all my accounts have the rate matching their type. I can also Introduce Assertion (302) in the account class.
