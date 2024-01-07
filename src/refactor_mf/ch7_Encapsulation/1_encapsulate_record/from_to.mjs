// from
{

  organization = { name: 'Acme Gooseberries', country: 'GB' }

}

// to
{
  class Organization {
    constructor(data) {
      this._name = data.name
      this._country = data.country
    }

    get name() {
      return this._name
    }

    set name(arg) {
      this._name = arg
    }

    get country() {
      return this._country
    }

    set country(arg) {
      this._country = arg
    }
  }
}

/**
 * This is why I often favor objects over records for mutable data.
 *
 * With objects, I can hide what is stored and provide methods for all three values. The user of the object doesn’t need to know or care which is stored and which is calculated.
 *
 * This encapsulation also helps with renaming: I can rename the field while providing methods for both the new and the old names, gradually updating callers until they are all done.
 *
 * I just said I favor objects for mutable data. If I have an immutable value, I can just have all three values in my record, using an enrichment step if necessary. Similarly, it’s easy to copy the field when renaming.
 *
 * I can have two kinds of record structures: those where I declare the legal field names and those that allow me to use whatever I like. The latter are often implemented through a library class called something like hash, map, hashmap, dictionary, or associative array. Many languages provide convenient syntax for creating hashmaps, which makes them useful in many programming situations. The downside of using them is they are aren’t explicit about their fields. The only way I can tell if they use start/end or start/length is by looking at where they are created and used. This isn’t a problem if they are only used in a small section of a program, but the wider their scope of usage, the greater problem I get from their implicit structure. I could refactor such implicit records into explicit ones — but if I need to do that, I’d rather make them classes instead.
 *
 * It’s common to pass nested structures of lists and hashmaps which are often serialized into formats like JSON or XML. Such structures can be encapsulated too, which helps if their formats change later on or if I’m concerned about updates to the data that are hard to keep track of.
 */




