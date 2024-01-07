// from

class Employee {}
class Salesman extends Employee {}

// to

class Employee {}

/**
 * why
 *
 * subclass 其實應該沒有意義了，可以跟 super class merge 一起了
 *
 *
 * When I’m refactoring a class hierarchy, I’m often pulling and pushing features around.
 * As the hierarchy evolves, I sometimes find that a class and its parent are no longer different enough to be worth keeping separate.
 * At this point, I’ll merge them together.
 */
