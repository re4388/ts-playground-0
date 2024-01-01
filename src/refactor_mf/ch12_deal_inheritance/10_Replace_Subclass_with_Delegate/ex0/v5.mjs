class Booking {
  constructor(show, date) {
    this._show = show
    this._date = date
  }


  // Now I finish the move by adding dispatch logic to the superclass method to use the delegate if it is present.
  get hasTalkback() {
    return (this._premiumDelegate)
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty('talkback') && !this.isPeakDay; }

  get basePrice() {
    let result = this._show.price
    if (this.isPeakDay) {
      result += Math.round(result * 0.15)
    }
    return result
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

  // I test to ensure everything is working, then delete the subclass method:
  // get hasTalkback() {
  //   return this._premiumDelegate.hasTalkback;
  // }

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
    return this._host._show.hasOwnProperty('talkback');
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
