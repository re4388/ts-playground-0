// I have a book class which has the ability to take a reservation for a customer.

// I need to support a priority queue for reservations. Thus, I need an extra parameter on addReservation to indicate whether the reservation should go in the usual queue or the high-priority queue.
import R from 'ramda'

class Book {

  // 同時支援!
  // old client 還是 call addReservation, 帶上 default value
  addReservation(customer) {
    this.addReservationV1(customer, false)
  }

  // client 可以開始用 v1 了
  addReservationV1(customer, isPriority) {

    //  check the new parameter is used by the caller.
    if (R.isNil(isPriority)) {
      throw new Error('isPriority is undefined')
    }
    // use isPriority to do something...

    this._reservations.push(customer)
  }
}

/**
 * Now, when I change the callers, if I make a mistake and leave off the new parameter, this assertion will help me catch the mistake.
 * And I know from long experience there are few more mistake-prone programmers than myself.
 *
 * Now, I can start changing the callers by using Inline Function (115) on the original function. This allows me to change one caller at a time.
 * I then rename the new function back to the original.
 * Usually, the simple mechanics work fine for this, but I can also use the migration approach if I need to.
 */
