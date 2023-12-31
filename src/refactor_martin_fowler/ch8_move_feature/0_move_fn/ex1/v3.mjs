class Account {
  get bankCharge() {
    let result = 4.5
    if (this._daysOverdrawn > 0) {
      result += this.type.overdraftCharge(this.daysOverdrawn);
    }
    return result
  }

  get overdraftCharge() {
    // In the earlier steps, I passed daysOverdrawn as a parameter
    // but if there’s a lot of data from the account to pass,
    // I might prefer to pass the account itself.
    return this.type.overdraftCharge(this)
  }
}



class AccountType {
  overdraftCharge(account) {
    if (this.isPremium) {
      const baseCharge = 10
      if (account <= 7) return baseCharge
      else
        return baseCharge + (account - 7) * 0.85
    } else
      return account * 1.75
  }
}
