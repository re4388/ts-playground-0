import assert from 'node:assert'




// plumages, 羽毛
function plumages(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]))
}

function speeds(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]))
}

function plumage(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 'average'
    case 'AfricanSwallow':
      return (bird.numberOfCoconuts > 2) ? 'tired' : 'average'
    case 'NorwegianBlueParrot':
      return (bird.voltage > 100) ? 'scorched' : 'beautiful'
    default:
      return 'unknown'
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 35
    case 'AfricanSwallow':
      return 40 - 2 * bird.numberOfCoconuts
    case 'NorwegianBlueParrot':
      return (bird.isNailed) ? 0 : 10 + bird.voltage / 10
    default:
      return null
  }
}


//////////////////////// TEST ////////////////


const data = [
  {
    name: 'bird1',
    type: 'EuropeanSwallow',
    numberOfCoconuts: 2,
    voltage:120,
    isNailed: true
  },
  {
    name: 'bird2',
    type: 'AfricanSwallow',
    numberOfCoconuts: 3,
    voltage:90,
    isNailed: false
  },
  {
    name: 'bird3',
    type: 'NorwegianBlueParrot',
    numberOfCoconuts: 2,
    voltage:120,
    isNailed: true
  }
]

let res1 = plumages(data)
let res2 = speeds(data)
assert.deepEqual( mapToObject(res1), { bird1: 'average', bird2: 'tired', bird3: 'scorched' })
assert.deepEqual( mapToObject(res2), { bird1: 35, bird2: 34, bird3: 0 }
)




function mapToObject(map) {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}
