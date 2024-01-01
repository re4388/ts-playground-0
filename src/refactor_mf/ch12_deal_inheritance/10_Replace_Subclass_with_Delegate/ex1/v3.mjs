// The previous example showed using Replace Subclass with Delegate on a single subclass, but I can do the same thing with an entire hierarchy.


// The system will shortly be making a big difference between birds tagged in the wild and those tagged in captivity. That difference could be modeled as two subclasses for Bird: WildBird and CaptiveBird. However, I can only use inheritance once, so if I want to use subclasses for wild versus captive, I’ll have to remove them for the species.


// Now I have the structure set up, I can apply Move Function (198) to the European swallow’s air speed velocity.
class EuropeanSwallowDelegate {
  get airSpeedVelocity() {
    return 35
  }
}


function createBird(data) {
  switch (data.type) {
    case 'AfricanSwallow':
      return new AfricanSwallow(data)
    case 'NorweigianBlueParrot':
      return new NorwegianBlueParrot(data)
    default:
      return new Bird(data)
  }
}

class Bird {

  // I need to decide where to handle the initialization of the delegate field. Here, since I have all the information in the single data argument to the constructor, I decide to do it in the constructor. Since there are several delegates I could add, I make a function to select the correct one based on the type code in the document.
  constructor(data) {
    this._name = data.name
    this._plumage = data.plumage
    this._speciesDelegate = this.selectSpeciesDelegate(data)
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case 'EuropeanSwallow':
        return new EuropeanSwallowDelegate()
      default:
        return null
    }
  }

  get name() {
    return this._name
  }

  get plumage() {
    return this._plumage || 'average'
  }

  get airSpeedVelocity() {
    return this._speciesDelegate ? this._speciesDelegate.airSpeedVelocity : null;
  }
}


class AfricanSwallow extends Bird {
  constructor(data) {
    super(data)
    this._numberOfCoconuts = data.numberOfCoconuts
  }

  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts
  }
}

class NorwegianBlueParrot extends Bird {
  constructor(data) {
    super(data)
    this._voltage = data.voltage
    this._isNailed = data.isNailed
  }

  get plumage() {
    if (this._voltage > 100) return 'scorched'
    else return this._plumage || 'beautiful'
  }

  get airSpeedVelocity() {
    return (this._isNailed) ? 0 : 10 + this._voltage / 10
  }
}
