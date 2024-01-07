// I have a book class which has the ability to take a reservation for a customer.

// I need to support a priority queue for reservations.
// Thus, I need an extra parameter on addReservation to indicate
// whether the reservation should go in the usual queue or the high-priority queue.
class Book {
  addReservation(customer) {
    this._reservations.push(customer)
  }
}



// client code

let b1 = new Book()
b1.addReservation('customer1')

let b2 = new Book()
b2.addReservation('customer1')
