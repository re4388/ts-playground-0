class Account {
  get bankCharge() {
    let result = 4.5
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge
    }
    return result
  }

  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10
      if (this.daysOverdrawn <= 7)
        return baseCharge
      else
        return baseCharge + (this.daysOverdrawn - 7) * 0.85
      } else
        return this.daysOverdrawn * 1.75
    }
}


class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10
      if (daysOverdrawn <= 7) return baseCharge
      else
        return baseCharge + (daysOverdrawn - 7) * 0.85
    } else
      return daysOverdrawn * 1.75
  }
}

// In order to get the method to fit in its new location, I need to deal with two call targets that change their scope.
// isPremium is now a simple call on this.
// With daysOverdrawn I have to decide — do I pass the value or do I pass the account? For the moment, I just pass the simple value but I may well change this in the future if I require more than just the days overdrawn from the account — especially if what I want from the account varies with the account type.
// Next, I replace the original method body with a delegating call.
