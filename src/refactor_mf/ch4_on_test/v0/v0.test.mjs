import { Province } from './v0.mjs'

function sampleProvinceData() {
  return {
    name: 'Asia', producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 }],
    demand: 30,
    price: 20
  }
}

describe('no producers', function() {
  let noProducers
  beforeEach(function() {
    const data = {
      name: 'No proudcers',
      producers: [],
      demand: 30,
      price: 20
    }
    noProducers = new Province(data)
  })
  test('shortfall', function() {
    expect(noProducers.shortfall).toBe(30)
  })
  test('profit', function() {
    expect(noProducers.profit).toBe(0)
  })


})

describe('string for producers', function() {
  test('', function() {
    const data = {
      name: 'String producers',
      producers: '',
      demand: 30,
      price: 20
    }
    const prov = new Province(data)
    expect(prov.shortfall).toBe(0)
  })
})

  describe('province', function() {
    let asia
    beforeEach(function() {
      asia = new Province(sampleProvinceData())
    })

    test('zero demand', function() {
      asia.demand = 0
      expect(asia.shortfall).toBe(-25)
      expect(asia.profit).toBe(0)
    })

    test('negative demand', function() {
      asia.demand = -1
      expect(asia.shortfall).toBe(-26)
      expect(asia.profit).toBe(-10)
    })

    test('empty string demand', function() {
      asia.demand = ''
      expect(asia.shortfall).toBeNaN
      expect(asia.profit).toBeNaN
    })


    test('shortfall', function() {
      expect(asia.shortfall).toBe(5)
    })


    test('profit', function() {
      expect(asia.profit).toBe(230)
    })

    test('change production', function() {
      asia.producers[0].production = 20
      expect(asia.shortfall).toBe(-6)
      expect(asia.profit).toBe(292)
    })
  })
