import assert from 'node:assert'


// 把 fn 整入這邊 的 map
function plumages(birds) {
  return new Map(birds
    .map(b => createBird(b))
    .map(b => [b.name, b.plumage])
  )
}

function speeds(birds) {
  return new Map(birds
    .map(b => createBird(b))
    .map(b => [b.name, b.airSpeedVelocity]))
}


function createBird(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return new EuropeanSwallow(bird)
    case 'AfricanSwallow':
      return new AfricanSwallow(bird)
    case 'NorwegianBlueParrot':
      return new NorwegianBlueParrot(bird)
    default:
      return new Bird(bird)
  }
}


/**
 *  I can see that the superclass Bird isn’t strictly needed.
 *  In JavaScript, I don’t need a type hierarchy for polymorphism; as long as my objects implement the appropriately named methods, everything works fine.
 *  In this situation, however, I like to keep the unnecessary superclass as it helps explain the way the classes are related in the domain.
 */
class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject)
  }

  get plumage() {
    return 'unknown'
  }

  get airSpeedVelocity() {
    return null
  }
}


// 處理 airSpeedVelocity 的 override
class EuropeanSwallow extends Bird {
  get plumage() {
    return 'average'
  }

  get airSpeedVelocity() {
    return 35
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? 'tired' : 'average'
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? 'scorched' : 'beautiful'
  }

  get airSpeedVelocity() {
    return (this.isNailed) ? 0 : 10 + this.voltage / 10
  }
}


//////////////////////// TEST ////////////////


const data = [
  {
    name: 'bird1',
    type: 'EuropeanSwallow',
    numberOfCoconuts: 2,
    voltage: 120,
    isNailed: true
  },
  {
    name: 'bird2',
    type: 'AfricanSwallow',
    numberOfCoconuts: 3,
    voltage: 90,
    isNailed: false
  },
  {
    name: 'bird3',
    type: 'NorwegianBlueParrot',
    numberOfCoconuts: 2,
    voltage: 120,
    isNailed: true
  }
]

let res1 = plumages(data)
let res2 = speeds(data)
assert.deepEqual(mapToObject(res1), { bird1: 'average', bird2: 'tired', bird3: 'scorched' })
assert.deepEqual(mapToObject(res2), { bird1: 35, bird2: 34, bird3: 0 }
)


function mapToObject(map) {
  const obj = {}
  for (const [key, value] of map) {
    obj[key] = value
  }
  return obj
}
