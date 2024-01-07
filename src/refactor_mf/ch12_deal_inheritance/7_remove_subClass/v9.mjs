class Person {

  // I now add a field to represent the difference between the subclasses;
  // since I’m using a code loaded from elsewhere, I might as well just use that.
  constructor(name) {
    this._name = name
    // When initializing it, I set it to the default case.
    // (As a side note, although most people can be classified as male or female,
    // there are people who can’t. It’s a common modeling mistake to forget that.)
    this._genderCode = genderCode
  }


  // and then, I can test, remove the male subclass, test again
  // , and repeat for the female subclass.
  get isMale() {
    return 'M' === this._genderCode
  }

  get name() {
    return this._name
  }

  get genderCode() {
    return this._genderCode
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

// I then take the male case and fold its logic into the superclass. This involves modifying the factory to return a Person and modifying any instanceof tests to use the gender code field.
function createPerson(aRecord) {
  switch (aRecord.gender) {
    case 'M':
      return new Person(aRecord.name, 'M')
    case 'F':
      return new Person(aRecord.name, 'F')

    // I find the lack of symmetry with the gender code to be annoying. A future reader of the code will always wonder about this lack of symmetry. So I prefer to change the code to make it symmetrical—if I can do it without introducing any other complexity, which is the case here.
    default:
      return new Person(aRecord.name, "X");
  }
}

// client...
// The factory encapsulates the creation of the subclasses, but there is also the use of instanceof—which never smells good. I use Extract Function (106) on the type check.
const numberOfMales = people.filter(p => p.isMale).length


// With that refactoring done, all knowledge of the subclasses is now safely encased within the superclass and the factory function.
// (Usually I’m wary of a superclass referring to a subclass, but this code isn’t going to last until my next cup of tea, so I’m not going worry about it.)

function isMale(aPerson) {
  return aPerson instanceof Male
}

export {}
