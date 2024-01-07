// from

class Employee {
  // Java private String quota;
}
class Engineer extends Employee {}
class Salesman extends Employee {}

// to

class Employee {}
class Engineer extends Employee {}
class Salesman extends Employee {
  //Java protected String quota;
}
/**
 * why
 *
 * inverse of: Pull Up Field (353)
 *
 * If a field is only used by one subclass (or a small proportion of subclasses), I move it to those subclasses.
 */
