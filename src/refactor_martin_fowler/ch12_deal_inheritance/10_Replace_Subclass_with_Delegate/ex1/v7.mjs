// The previous example showed using Replace Subclass with Delegate on a single subclass, but I can do the same thing with an entire hierarchy.


// The system will shortly be making a big difference between birds tagged in the wild and those tagged in captivity. That difference could be modeled as two subclasses for Bird: WildBird and CaptiveBird. However, I can only use inheritance once, so if I want to use subclasses for wild versus captive, I’ll have to remove them for the species.


// The tricky step is how to remove the subclass method for plumage
// 因為只有 NorwegianBlueParrotDelegate 有 plumage
// I apply Extract Superclass (375) to the species delegates:
class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird
  }

  get plumage() {
    return this._bird._plumage || 'average'
  }

  get airSpeedVelocity() {
    return null
  }
}


// Now I have the structure set up, I can apply Move Function (198) to the European swallow’s air speed velocity.
class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35
  }
}

// Next I’ll tackle the African swallow. I create a class; this time, the constructor needs the data document.
class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data) {
    super(data, bird)
    this._numberOfCoconuts = data.numberOfCoconuts
  }

  // I use Move Function (198) on airSpeedVelocity.
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data) {
    super(data, bird)
    this._voltage = data.voltage
    this._isNailed = data.isNailed
  }

  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10
  }
}


function createBird(data) {
  switch (data.type) {
    case 'NorweigianBlueParrot':
      return new NorwegianBlueParrot(data)
    default:
      return new Bird(data)
  }
}

class Bird {

  constructor(data) {
    this._name = data.name
    this._plumage = data.plumage
    this._speciesDelegate = this.selectSpeciesDelegate(data)
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case 'EuropeanSwallow':
        return new EuropeanSwallowDelegate()
      case 'AfricanSwallow':
        return new AfricanSwallowDelegate(data)
      case 'NorweigianBlueParrot':
        return new NorwegianBlueParrotDelegate(data)
      default:
        return new SpeciesDelegate(data, this)
    }
  }

  get name() {
    return this._name
  }


  get plumage() {
    return this._speciesDelegate.plumage
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity
  }
}


class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data)
    this._voltage = data.voltage
    this._isNailed = data.isNailed
  }

  get plumage() {
    return this._speciesDelegate.plumage
  }

  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10
  }
}

/**
 * This example replaces the original subclasses with a delegate, but there is still a very similar inheritance structure in SpeciesDelegate.
 *
 * The species inheritance is now more tightly scoped, covering just the data and functions that vary due to the species.
 * Any code that’s the same for all species remains on Bird and its future subclasses.
 *
 * I could apply the same idea of creating a superclass delegate to the booking example earlier. This would allow me to replace those methods on Booking that have dispatch logic with simple calls to the delegate and letting its inheritance sort out the dispatch. However, it’s nearly dinner time, so I’ll leave that as an exercise for the reader.
 *
 * These examples illustrate that the phrase “Favor object composition over class inheritance” might better be said as “Favor a judicious mixture of composition and inheritance over either alone”—but I fear that is not as catchy.
 *
 */
