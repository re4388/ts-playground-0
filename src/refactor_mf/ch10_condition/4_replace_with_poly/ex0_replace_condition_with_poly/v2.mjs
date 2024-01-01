import assert from 'node:assert'


function plumages(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]))
}

function speeds(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
}




function plumage(bird) {
  return createBird(bird).plumage
}

function airSpeedVelocity(bird) {
  return createBird(bird).airSpeedVelocity
}

// 建立 factory fn，源頭這邊處理 switch case
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

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject)
  }

  get plumage() {
    switch (this.type) {
      case 'EuropeanSwallow':
        throw "oops";  // 下面 EuropeanSwallow sub class 建立，這邊可以 throw了
      case 'AfricanSwallow':
        return (this.numberOfCoconuts > 2) ? 'tired' : 'average'
      case 'NorwegianBlueParrot':
        return (this.voltage > 100) ? 'scorched' : 'beautiful'
      default:
        return 'unknown'
    }
  }

  get airSpeedVelocity() {
    switch (this.type) {
      case 'EuropeanSwallow':
        return 35
      case 'AfricanSwallow':
        return 40 - 2 * this.numberOfCoconuts
      case 'NorwegianBlueParrot':
        return (this.isNailed) ? 0 : 10 + this.voltage / 10
      default:
        return null
    }
  }
}


// 可以開始建立不同的 subclass，先處理 EuropeanSwallow
class EuropeanSwallow extends Bird {
  get plumage() {
    return 'average'
  }
}

class AfricanSwallow extends Bird {
}

class NorwegianBlueParrot extends Bird {
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
