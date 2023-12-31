
// 這邊是否會根據不同的 type 有不同的 charge, 我們可以分出一個專門處理 type 的 class
class Account {
  get bankCharge() {
    let result = 4.5
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge
    }
    return result
  }

  // The first step is to look at the features that the overdraftCharge method uses
  // and consider whether it is worth moving a batch of methods together.
  // In this case I need the daysOverdrawn method to remain on the account class,
  // because that will vary with individual accounts, so this will remain in the Account class.
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
