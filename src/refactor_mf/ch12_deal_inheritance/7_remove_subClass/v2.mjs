class Person {
  constructor(name) {
    this._name = name
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


// In that case, I find it better to use Extract Function (106) on the selection logic for which class to create, and make that the factory function.
function loadFromInput(data) {
  const result = []
  data.forEach(aRecord => {
    result.push(createPerson(aRecord))
  })
  return result
}

function createPerson(aRecord) {
  let p
  switch (aRecord.gender) {
    case 'M':
      p = new Male(aRecord.name)
      break
    case 'F':
      p = new Female(aRecord.name)
      break
    default:
      p = new Person(aRecord.name)
  }
  return p
}


// client...
const numberOfMales = people.filter(p => p instanceof Male).length

export {}
