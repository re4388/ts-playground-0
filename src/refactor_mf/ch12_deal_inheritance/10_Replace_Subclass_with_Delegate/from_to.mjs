// from

class Order {
  get daysToShip() {
    return this._warehouse.daysToShip
  }
}

class PriorityOrder extends Order {
  get daysToShip() {
    return this._priorityPlan.daysToShip
  }
}

// to


class Order {
  get daysToShip() {
    return (this._priorityDelegate)
      ? this._priorityDelegate.daysToShip : this._warehouse.daysToShip
  }
}

class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip
  }
}

/**
 *
 * 把 subclass 轉為 delegate
 *
 * 本來是 superclass and subclass 的關係 -> class and delegate 的關係
 *
 *
 * why
 *
 * If I have some objects whose behavior varies from category to category, the natural mechanism to express this is inheritance. I put all the common data and behavior in the superclass, and let each subclass add and override features as needed. Object-oriented languages make this simple to implement and thus a familiar mechanism.
 *
 * But inheritance has its downsides. Most obviously, it’s a card that can only be played once. If I have more than one reason to vary something, I can only use inheritance for a single axis of variation.
 *
 * A further problem is that inheritance introduces a very close relationship be- tween classes. Any change I want to make to the parent can easily break children, so I have to be careful and understand how children derive from the superclass.
 *
 *
 * Delegation handles both of these problems. I can delegate to many different classes for different reasons. Delegation is a regular relationship between objects—so I can have a clear interface to work with, which is much less coupling than subclassing. It’s therefore common to run into the problems with subclassing and apply Replace Subclass with Delegate.
 *
 * I use inheritance frequently, partly because I always know I can use Replace Subclass with Delegate should I need to change it later. Inheritance is a valuable mechanism that does the job most of the time without problems. So I reach for it first, and move onto delegation when it starts to rub badly.
 *
 * Those who are familiar with the Gang of Four book may find it helpful to think of this refactoring as replacing subclasses with the State or Strategy patterns. Both of these patterns are structurally the same, relying on the host delegating to a separate hierarchy.
 */
