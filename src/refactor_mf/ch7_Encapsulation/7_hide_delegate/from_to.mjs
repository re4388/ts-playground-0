// from

// client use...server aPerson
// force to know department(delegate object)
manager = aPerson.department.manager



// to


// client no need to know department
manager = aPerson.manager


// server side
class Person {
  get manager() {
    // server hides the delegate
    return this.department.manager
  }
}


/**
 * why
 *
 * inverse of: remove middle man
 *
 * Encapsulation means that modules need to know less about other parts of the system.
 * Then, when things change, fewer modules need to be told about the change — which makes the change easier to make.
 *
 * When we are first taught about object orientation, we are told that encapsulation means hiding our fields.
 * As we become more sophisticated, we realize there is more that we can encapsulate.
 *
 * If I have some client code that calls a method defined on an object in a field of a server object, the client needs to know about this delegate object. If the delegate changes its interface, changes propagate to all the clients of the server that use the delegate.
 *
 * I can remove this dependency by placing a simple delegating method on the server that hides the delegate.
 * Then any changes I make to the delegate propagate only to the server and not to the clients.
 *
 *
 *
 */
