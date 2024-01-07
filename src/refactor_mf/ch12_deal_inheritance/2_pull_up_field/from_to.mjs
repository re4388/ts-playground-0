// from


class Employee {
}
class Salesman extends Employee {
  // Java syntax
  // private String
  name
}

class Engineer extends Employee {
  private String
  name
}


// to

class Employee {
  // java syntax
  // protected string name
}

class Salesman extends Employee {

}

class Engineer extends Employee {

}


/**
 * why
 *
 * If subclasses are developed independently, or combined through refactoring, I often find that they duplicate features. In particular, certain fields can be duplicates.
 *
 * Such fields sometimes have similar names — but not always.
 *
 * The only way I can tell what is going on is by looking at the fields and examining how they are used.
 *
 * If they are being used in a similar way, I can pull them up into the superclass.
 *
 * By doing this, I reduce duplication in two ways.
 * I remove the duplicate data declaration and
 * I can then move behavior that uses the field from the subclasses to the superclass.
 *
 * Many dynamic languages do not define fields as part of their class definition— instead, fields appear when they are first assigned to. In this case, pulling up a field is essentially a consequence of Pull Up Constructor Body (355).
 */


export {}
