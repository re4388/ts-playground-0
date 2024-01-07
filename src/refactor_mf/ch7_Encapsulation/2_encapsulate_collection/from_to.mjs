// from
{
  class Person {
    get courses() {
      return this._courses
    }

    set courses(aList) {
      this._courses = aList
    }

  }
}


// to
{
  class Person {
    get courses() {
      return this._courses.slice()
    }

    addCourse(aCourse) {
    }

    removeCourse(aCourse) {
    }
  }

}


/**
 * I like encapsulating any mutable data in my programs. This makes it easier to see when and how data structures are modified, which then makes it easier to change those data structures when I need to.
 *
 * Encapsulation is often encouraged, particularly by object-oriented developers, but a common mistake occurs when working with collections.
 *
 * Access to a collection variable may be encapsulated, but if the getter returns the collection itself, then that collection’s membership can be altered without the enclosing class being able to intervene.
 *
 * To avoid this, I provide collection modifier methods — usually add and remove — on the class itself. This way, changes to the collection go through the owning class, giving me the opportunity to modify such changes as the program evolves.
 *
 * If the team has the habit to not to modify collections outside the original module, just providing these methods may be enough. However, it’s usually unwise to rely on such habits; a mistake here can lead to bugs that are difficult to track down later.
 *
 * A better approach is to ensure that the getter for the collection does not return the raw collection, so that clients cannot accidentally change it.
 *
 * One way to prevent modification of the underlying collection is by never returning a collection value. In this approach, any use of a collection field is done with specific methods on the owning class, replacing aCustomer.orders.size with aCustomer.numberOfOrders. I don’t agree with this approach. Modern languages have rich collection classes with standardized interfaces, which can be combined in useful ways such as Collection Pipelines [mf-cp]. Putting in special methods to handle this kind of functionality adds a lot of extra code and cripples the easy composability of collection operations.
 *
 * Another way is to allow some form of read-only access to a collection. Java, for example, makes it easy to return a read-only proxy to the collection. Such a proxy forwards all reads to the underlying collection, but blocks all writes—in Java’s case, throwing an exception. A similar route is used by libraries that base their collection composition on some kind of iterator or enumerable object— providing that iterator cannot modify the underlying collection.
 *
 * Probably the most common approach is to provide a getting method for the collection, but make it return a copy of the underlying collection. That way, any modifications to the copy don’t affect the encapsulated collection. This might cause some confusion if programmers expect the returned collection to modify the source field—but in many code bases, programmers are used to collection getters providing copies. If the collection is huge, this may be a performance issue —but most lists aren’t all that big, so the general rules for performance should apply (Refactoring and Performance (64)).
 *
 * Another difference between using a proxy and a copy is that a modification of the source data will be visible in the proxy but not in a copy. This isn’t an issue most of the time, because lists accessed in this way are usually only held for a short time.
 * What’s important here is consistency within a code base. Use only one mechanism so everyone can get used to how it behaves and expect it when calling any collection accessor function.
 */


