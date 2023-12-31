// from

let defaultOwner = {
  firstName: 'Martin',
  lastName: 'Fowler'
}

// to

let defaultOwnerData = {
  firstName: 'Martin',
  lastName: 'Fowler'
}

export function defaultOwner() {
  return defaultOwnerData
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg
}


/**
 *
 * why
 *
 * Refactoring is all about manipulating the elements of our programs. Data is more awkward to manipulate than functions.
 *
 * Since using a function usually means calling it, I can easily rename or move a function while keeping the old function intact as a forwarding function (so my old code calls the old function, which calls the new function). I’ll usually not keep this forwarding function around for long, but it does simplify the refactoring.
 *
 *
 * Data is more awkward because I can’t do that. If I move data around, I have to change all the references to the data in a single cycle to keep the code working. For data with a very small scope of access, such as a temporary variable in a small function, this isn’t a problem. But as the scope grows, so does the difficulty, which is why global data is such a pain.
 *
 *
 * So if I want to move widely accessed data, often the best approach is to first encapsulate it by routing all its access through functions. That way, I turn the difficult task of reorganizing data into the simpler task of reorganizing functions.
 *
 *
 * Encapsulating data is valuable for other things too. It provides a clear point to monitor changes and use of the data; I can easily add validation or consequential logic on the updates. It is my habit to make all mutable data encapsulated like this and only accessed through functions if its scope is greater than a single function. The greater the scope of the data, the more important it is to encapsulate.
 *
 *
 * My approach with legacy code is that whenever I need to change or add a new reference to such a variable, I should take the opportunity to encapsulate it. That way I prevent the increase of coupling to commonly used data.
 *
 *
 * This principle is why the object-oriented approach puts so much emphasis on keeping an object’s data private. Whenever I see a public field, I consider using Encapsulate Variable (in that case often called Encapsulate Field) to reduce its visibility.
 *
 * Some go further and argue that even internal references to fields within a class should go through accessor functions — an approach known as self-encapsulation. On the whole, I find self-encapsulation excessive — if a class is so big that I need to self-encapsulate its fields, it needs to be broken up anyway. But self-encapsulating a field is a useful step before splitting a class.
 *
 * Keeping data encapsulated is much less important for immutable data. When the data doesn’t change, I don’t need a place to put in validation or other logic hooks before updates. I can also freely copy the data rather than move it — so I don’t have to change references from old locations, nor do I worry about sections of code getting stale data. Immutability is a powerful preservative.
 */
