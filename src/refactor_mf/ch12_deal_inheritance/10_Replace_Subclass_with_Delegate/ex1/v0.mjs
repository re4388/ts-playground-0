// The previous example showed using Replace Subclass with Delegate on a single subclass, but I can do the same thing with an entire hierarchy.


// The system will shortly be making a big difference between birds tagged in the wild and those tagged in captivity. That difference could be modeled as two subclasses for Bird: WildBird and CaptiveBird. However, I can only use inheritance once, so if I want to use subclasses for wild versus captive, I’ll have to remove them for the species.

function createBird(data) {
  switch (data.type) {
    case 'EuropeanSwallow':
      return new EuropeanSwallow(data)
    case 'AfricanSwallow':
      return new AfricanSwallow(data)
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
  }

  get name() {
    return this._name
  }

  get plumage() {
    return this._plumage || 'average'
  }

  get airSpeedVelocity() {
    return null
  }
}

class EuropeanSwallow extends Bird {
  get airSpeedVelocity() {
    return 35
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
