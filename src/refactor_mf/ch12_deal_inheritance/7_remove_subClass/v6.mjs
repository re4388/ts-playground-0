class Person {
  constructor(name) {
    this._name = name
  }


  // Then I use Move Function (198) to move it into Person.
  get isMale() {
    return this instanceof Male
  }

  get name() {
    return this._name
  }

  get genderCode() {
    return 'X'
  }

}

class Male extends Person {
  get genderCode() {
    return 'M'
  }
}

class Female extends Person {
  get genderCode() {
    return 'F'
  }
}


// If that’s all that a subclass does, it’s not really worth having. But before I remove these subclasses, it’s usually worth checking to see if there’s any subclass- dependent behavior in the clients that should be moved in there. In this case, I don’t find anything worth keeping the subclasses for.


// Whenever I want to change how I represent something, I try to first encapsulate the current representation to minimize the impact on any client code. When it comes to creating subclasses, the way to encapsulate is to use Replace Constructor with Factory Function (334). In this case, there’s a couple of ways I could make the factory.

// The most direct way is to create a factory method for each constructor.
// function createPerson(name) { return new Person(name);}
// function createMale(name) { return new Male(name); }
// function createFemale(name) { return new Female(name);}


// and Replace Loop with Pipeline (231) on loadFromInput:
function loadFromInput(data) {
  return data.map(aRecord => createPerson(aRecord))
}

// While I’m there, I’ll clean up those two functions. I’ll use Inline Variable (123) on createPerson:
function createPerson(aRecord) {
  switch (aRecord.gender) {
    case 'M':
      return new Male(aRecord.name)
    case 'F':
      return new Female(aRecord.name)
    default:
      return new Person(aRecord.name)
  }
}

// client...
// The factory encapsulates the creation of the subclasses, but there is also the use of instanceof—which never smells good. I use Extract Function (106) on the type check.
const numberOfMales = people.filter(p => p.isMale).length;


// With that refactoring done, all knowledge of the subclasses is now safely encased within the superclass and the factory function.
// (Usually I’m wary of a superclass referring to a subclass, but this code isn’t going to last until my next cup of tea, so I’m not going worry about it.)

function isMale(aPerson) {
  return aPerson instanceof Male
}

export {}
