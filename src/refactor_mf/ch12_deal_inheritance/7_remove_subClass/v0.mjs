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


// client...
const numberOfMales = people.filter(p => p instanceof Male).length;

export {}
