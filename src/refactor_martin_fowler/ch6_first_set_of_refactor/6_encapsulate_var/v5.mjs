// I then start working on references to defaultOwner. When I see a reference, I replace it with a call to the getting function.
spaceship.owner = getDefaultOwner()

// When I see an assignment, I replace it with the setting function.
setDefaultOwner({ firstName: 'Rebecca', lastName: 'Parsons' })


// The basic refactoring encapsulates the reference to the data item. In many cases, this is all I want to do for the moment.
// But I often want to take the encapsulation deeper to control not just changes to the variable but also to its contents.
// For this, I have a couple of options.
// The simplest one is to prevent any changes to the value.
// My favorite way to handle this is by modifying the getting function to return a copy of the data.

// defaultOwner.js


let defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' }

export function defaultOwner() {
  // however: Some code may expect to change shared data. If that’s the case, I’m relying on my tests to detect a problem.
  // An alternative is to prevent changes — and a good way of doing that is Encapsulate Record (162).
  {
    return new Person(defaultOwnerData)
  }
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg
}

class Person {
  constructor(data) {
    this._lastName = data.lastName
    this._firstName = data.firstName
  }

  get lastName() {
    return this._lastName
  }

  get firstName() {
    return this._firstName
  } // and so on for other properties
}

/**
 * Now, any attempt to reassign the properties of the default owner will cause an error. Different languages have different techniques to detect or prevent changes like this, so depending on the language I’d consider other options.
 *
 * Detecting and preventing changes like this is often worthwhile as a temporary measure. I can either remove the changes, or provide suitable mutating functions. Then, once they are all dealt with, I can modify the getting method to return a copy.
 *
 * So far I’ve talked about copying on getting data, but it may be worthwhile to make a copy in the setter too. That will depend on where the data comes from and whether I need to maintain a link to reflect any changes in that original data.
 *
 * If I don’t need such a link, a copy prevents accidents due to changes on that source data.
 *
 * Taking a copy may be superfluous most of the time, but copies in these cases usually have a negligible effect on performance; on the other hand, if I don’t do them, there is a risk of a long and difficult bout of debugging in the future.
 *
 * Remember that the copying above, and the class wrapper, both only work one level deep in the record structure. Going deeper requires more levels of copies or object wrapping.
 *
 * As you can see, encapsulating data is valuable, but often not straightforward. Exactly what to encapsulate — and how to do it — depends on the way the data is being used and the changes I have in mind.
 *
 * But the more widely it’s used, the more it’s worth my attention to encapsulate properly.
 */


// 無關上面的東西，只是要讓上面的 export 不影響其他 module
  export {
}
