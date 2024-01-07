// from
class Customer {
  get plan() {
    return this._plan
  }

  get discountRate() {
    return this._discountRate
  }
}

// to

// 把 _discountRate move to plan class

class Customer {
  get plan() {
    return this._plan
  }

  get discountRate() {
    return this.plan.discountRate
  }
}

export {}


/**
 * why
 *
 * Programming involves writing a lot of code that implements behavior — but the strength of a program is really founded on its data structures.
 *
 * If I have a good set of data structures that match the problem, then my behavior code is simple and straightforward. But poor data structures lead to lots of code whose job is merely dealing with the poor data. And it’s not just messier code that’s harder to understand; it also means the data structures obscure what the program is doing.
 *
 * So, data structures are important — but like most aspects of programming they are hard to get right. I do make an initial analysis to figure out the best data structures, and I’ve found that experience and techniques like domain-driven design have improved my ability to do that. But despite all my skill and experience, I still find that I frequently make mistakes in that initial design. In the process of programming, I learn more about the problem domain and my data structures. A design decision that is reasonable and correct one week can become wrong in another.
 *
 * As soon as I realize that a data structure isn’t right, it’s vital to change it. If I leave my data structures with their blemishes, those blemishes will confuse my thinking and complicate my code far into the future.
 *
 *
 * I may seek to move data because I find I always need to pass a field from one record whenever I pass another record to a function. Pieces of data that are always passed to functions together are usually best put in a single record in order to clarify their relationship. Change is also a factor; if a change in one record causes a field in another record to change too, that’s a sign of a field in the wrong place. If I have to update the same field in multiple structures, that’s a sign that it should move to another place where it only needs to be updated once.
 *
 *
 * I usually do Move Field in the context of a broader set of changes. Once I’ve moved a field, I find that many of the users of the field are better off accessing that data through the target object rather than the original source. I then change these with later refactorings. Similarly, I may find that I can’t do Move Field at the moment due to the way the data is used. I need to refactor some usage patterns first, then do the move.
 *
 * In my description so far, I’m saying “record,” but all this is true of classes and objects too. A class is a record type with attached functions — and these need to be kept healthy just as much as any other data. The attached functions do make it easier to move data around, since the data is encapsulated behind accessor methods. I can move the data, change the accessors, and clients of the accessors will still work. So, this is a refactoring that’s easier to do if you have classes, and my description below makes that assumption. If I’m using bare records that don’t support encapsulation, I can still make a change like this, but it is more tricky.
 */
