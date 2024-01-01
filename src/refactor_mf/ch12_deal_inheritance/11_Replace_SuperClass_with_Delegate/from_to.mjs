// from
class List {
}

class Stack extends List {
}

// stack 不需要繼承很多 list 的操作
// 因此這邊用 composition/delegate 比較好


// to
class Stack {
  constructor() {
    this._storage = new List()
  }
}

class List {
}


/**
 * why
 *
 * In object-oriented programs, inheritance is a powerful and easily available way to reuse existing functionality. I inherit from some existing class, then override and add additional features. But subclassing can be done in a way that leads to confusion and complication.
 *
 * One of the classic examples of mis-inheritance from the early days of objects was making a stack be a subclass of list.
 * The idea that led to this was reusing of list’s data storage and operations to manipulate it.
 *
 * While it’s good to reuse, this inheritance had a problem: All the operations of the list were present on the interface of the stack, although most of them were not applicable to a stack.
 *
 * A better approach is to make the list into a field of the stack and delegate the necessary operations to it.
 *
 * This is an example of one reason to use Replace Superclass with Delegate—if functions of the superclass don’t make sense on the subclass, that’s a sign that I shouldn’t be using inheritance to use the superclass’s functionality.
 *
 * As well as using all the functions of the superclass, it should also be true that every instance of the subclass is an instance of the superclass and a valid object in all cases where we’re using the superclass. If I have a car model class, with things like name and engine size, I might think I could reuse these features to represent a physical car, adding functions for VIN number and manufacturing date. This is a common, and often subtle, modeling mistake which I’ve called the type-instance homonym
 *
 * These are both examples of problems leading to confusion and errors—which can be easily avoided by replacing inheritance with delegation to a separate object. Using delegation makes it clear that it is a separate thing—one where only some of the functions carry over.
 *
 * Even in cases where the subclass is reasonable modeling, I use Replace Super- class with Delegate because the relationship between a sub- and superclass is highly coupled, with the subclass easily broken by changes in the superclass. The downside is that I need to write a forwarding function for any function that is the same in the host and in the delegate—but, fortunately, even though such forwarding functions are boring to write, they are too simple to get wrong.
 *
 * As a consequence of all this, some people advise avoiding inheritance entirely—but I don’t agree with that. Provided the appropriate semantic conditions apply (every method on the supertype applies to the subtype, every instance of the subtype is an instance of the supertype), inheritance is a simple and effective mechanism. I can easily apply Replace Superclass with Delegate should the situ- ation change and inheritance is no longer the best option. So my advice is to (mostly) use inheritance first, and apply Replace Superclass with Delegate when (and if) it becomes a problem.
 *
 */
