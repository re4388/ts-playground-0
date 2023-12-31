class Booking {
  constructor(show, date) {
    this._show = show
    this._date = date
  }


  // Now I finish the move by adding dispatch logic to the superclass method to use the delegate if it is present.
  get hasTalkback() {
    return (this._premiumDelegate)
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay
  }


  // I can recast the delegate’s method as an extension of the base method.
  get basePrice() {
    let result = this._show.price
    if (this.isPeakDay) {
      result += Math.round(result * 0.15)
    }
    return (this._premiumDelegate)
      ? this._premiumDelegate.extendBasePrice(result)
      : result
  }


  // I use a leading underscore on _bePremium to indicate that it shouldn’t be part of the public interface for Booking. Of course, if the point of doing this refactoring is to allow a booking to mutate to premium, it can be a public method.
  _bePremium(extras) {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras)
  }

  get hasDinner() {
    return (this._premiumDelegate)
      ? this._premiumDelegate.hasDinner
      : undefined
  }
  // In JavaScript, accessing a property on an object where it isn’t defined returns undefined, so I do that here. (Although my every instinct is to have it raise an error, which would be the case in other object-oriented dynamic languages I’m used to.)


}

// once I’ve run tests to ensure all is well, delete the subclass.


/**
 * This is one of those refactorings where I don’t feel that refactoring alone improves the code.
 * Inheritance handles this situation very well, whereas using delegation involves adding dispatch logic, two-way references, and thus extra complexity.
 * The refactoring may still be worthwhile, since the advantage of a mutable premium status, or a need to use inheritance for other purposes, may outweigh the disadvantage of losing inheritance.
 */







// I now make the new delegate class.
// Its constructor parameters are those parameters that are only used in the subclass,
// together with a back-reference to the booking object.
class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking
    this._extras = extras
  }

  // With the structures set up, it’s time to start moving the behavior. The first case I’ll consider is the simple override of hasTalkback.
  get hasTalkback() {
    return this._host._show.hasOwnProperty('talkback')
  }

  extendBasePrice(base) {
    return Math.round(base + this._extras.premiumFee)
  }

  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this._host.isPeakDay
  }
}


// booking client
aBooking = createBooking(show, date)
// premium client
aBooking = createPremiumBooking(show, date, extras)


function createBooking(show, date) {
  return new Booking(show, date)
}

// Once I’ve moved all the behavior out of the subclass, I can change the factory method to return the superclass
function createPremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras)
  result._bePremium(extras)
  return result
}
