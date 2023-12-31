// from

if (aCustomer === 'unknown') customerName = 'occupant'


// to

class UnknownCustomer {
  get name() {
    return 'occupant'
  }
}

/**
 * why?
 *
 * A common case of duplicated code is when many users of a data structure check a specific value, and then most of them do the same thing.
 * If I find many parts of the code base having the same reaction to a particular value, I want to bring that reaction into a single place.
 *
 * A good mechanism for this is the Special Case pattern where I create a special-case element that captures all the common behavior. This allows me to replace most of the special-case checks with simple calls.
 *
 * A special case can manifest itself in several ways. If all I’m doing with the object is reading data, I can supply a literal object with all the values I need filled in. If I need more behavior than simple values, I can create a special object with methods for all the common behavior. The special-case object can be returned by an encapsulating class, or inserted into a data structure with a transform.
 *
 * A common value that needs special-case processing is null, which is why this pattern is often called the Null Object pattern. But it’s the same approach for any special case —I like to say that Null Object is a special case of Special Case.
 */
