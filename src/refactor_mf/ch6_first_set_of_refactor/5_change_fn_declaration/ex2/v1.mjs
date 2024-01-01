// I have a book class which has the ability to take a reservation for a customer.

// I need to support a priority queue for reservations. Thus, I need an extra parameter on addReservation to indicate whether the reservation should go in the usual queue or the high-priority queue.


class Book {
  addReservation(customer) {
    this.addReservationV1(customer);
  }

  // I begin by using Extract Function (106) on the body of addReservation to create the new function. Although it will eventually be called addReservation, the new and old functions can’t coexist with the same name. So I use a temporary name that will be easy to search for later.
  addReservationV1(customer) {
    this._reservations.push(customer)
  }
}
