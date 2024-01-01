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


}


class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date)
    this._extras = extras
  }


  // This is almost the same, but there is a wrinkle in the form of the pesky call on super
  // (which is pretty common in these kinds of subclass extension cases).
  // When I move the subclass code to the delegate, I’ll need to call the parent case
  // — but I can’t just call this._host._basePrice without getting into an endless recursion.
  get basePrice() {
    return Math.round(super.basePrice + this._extras.premiumFee)
  }

  get hasDinner() {
    return this._extras.hasOwnProperty('dinner') && !this.isPeakDay
  }
}

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
}


// booking client
aBooking = createBooking(show, date)
// premium client
aBooking = createPremiumBooking(show, date, extras)


function createBooking(show, date) {
  return new Booking(show, date)
}

// I now connect the new delegate to the booking object. I do this by modifying the factory function for premium bookings.
function createPremiumBooking(show, date, extras) {
  const result = new PremiumBooking(show, date, extras)
  result._bePremium(extras)
  return result
}
