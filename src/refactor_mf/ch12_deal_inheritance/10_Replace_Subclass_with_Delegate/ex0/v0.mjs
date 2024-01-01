class Booking {
  constructor(show, date) {
    this._show = show
    this._date = date
  }

  get hasTalkback() {
    return this._show.hasOwnProperty('talkback') && !this.isPeakDay
  }

  get basePrice() {
    let result = this._show.price
    if (this.isPeakDay) {
      result += Math.round(result * 0.15)
    }
    return result
  }

}


class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date)
    this._extras = extras
  }

  get hasTalkback() {
    return this._show.hasOwnProperty('talkback')
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay
  }
}

// booking client
aBooking = new Booking(show,date);
// premium client
aBooking = new PremiumBooking(show, date, extras);



/**
 * Inheritance works well for this example. I can understand the base class without having to understand the subclass. The subclass is defined just by saying how it differs from the base case—both reducing duplication and clearly communicating what are the differences it’s introducing.
 *
 * Actually, it isn’t quite as perfect as the previous paragraph implies. There are things in the superclass structure that only make sense due to the subclass—such as methods that have been factored in such a way as to make it easier to override just the right kinds of behavior. So although most of the time I can modify the base class without having to understand subclasses, there are occasions where such mindful ignorance of the subclasses will lead me to breaking a subclass by modifying the superclass. However, if these occasions are not too common, the inheritance pays off—provided I have good tests to detect a subclass breakage.
 *
 * So why would I want to change such a happy situation by using Replace Subclass with Delegate?
 *
 * Inheritance is a tool that can only be used once — so if I have another reason to use inheritance, and I think it will benefit me more than the premium booking subclass, I’ll need to handle premium bookings a different way.
 *
 * Also, I may need to change from the default booking to the premium booking dynamically — i.e.,support a method like aBooking.bePremium().
 * In some cases, I can avoid this by creating a whole new object (a common example is where an HTTP request loads new data from the server).
 * But sometimes, I need to modify a data structure and not rebuild it from scratch, and it is difficult to just replace a single booking that’s referred to from many different places. In such situations, it can be useful to allow a booking to switch from default to premium and back again.
 */
