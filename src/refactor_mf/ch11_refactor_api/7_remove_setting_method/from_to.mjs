// from

class Person {
  get name() {
  }

  set name(aString) {
  }
}

// to

class Person {
  get name() {
  }
}


/**
 * why
 *
 * Providing a setting method indicates that a field may be changed. If I don’t want that field to change once the object is created, I don’t provide a setting method (and make the field immutable).
 *
 * That way, the field is set only in the constructor, my intention to have it not change is clear, and I usually remove the very possibility that the field will change.
 *
 * There’s a couple of common cases where this comes up. One is where people always use accessor methods to manipulate a field, even within constructors. This leads to the only call to a setting method being from the constructor.
 *
 * I prefer to remove the setting method to make it clear that updates make no sense after construction.
 *
 * Another case is where the object is created by clients using creation script rather than by a simple constructor call.
 *
 * Such a creation script starts with the constructor call followed by a sequence of setter method calls to create the new object.
 *
 * Once the script is finished, we don’t expect the new object to change some (or even all) of its fields.
 *
 * The setters are only expected to be called during this initial creation. In this case, I’d get rid of them to make my intentions clearer.
 */
