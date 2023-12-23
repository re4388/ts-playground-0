import assert from 'node:assert'


class Rating {
  constructor(voyage, history) {
    this.voyage = voyage
    this.history = history
  }

  get value() {
    const vpf = this.voyageProfitFactor
    const vr = this.voyageRisk
    const chr = this.captainHistoryRisk
    if (vpf * 3 > (vr + chr * 2)) return 'A'
    else return 'B'
  }

  get voyageRisk() {
    let result = 1
    if (this.voyage.length > 4) result += 2
    if (this.voyage.length > 8) result += this.voyage.length - 8
    if (['china', 'east-indies'].includes(this.voyage.zone)) result += 4
    return Math.max(result, 0)
  }

  get captainHistoryRisk() {
    let result = 1
    if (this.history.length < 5) result += 4
    result += this.history.filter(v => v.profit < 0).length
    return Math.max(result, 0)
  }

  get voyageProfitFactor() {
    let result = 2
    if (this.voyage.zone === 'china') result += 1
    if (this.voyage.zone === 'east-indies') result += 1
    result += this.historyLengthFactor;
    // Rename Function (124), 名字改對, 只有處理 voyage
    result += this.voyageLengthFactor
    return result
  }

  get voyageLengthFactor() {
    // 簡化寫法
    return (this.voyage.length > 14) ? - 1: 0;
  }

  get historyLengthFactor() {
    return (this.history.length > 8) ? 1 : 0;
  }
}

class ExperiencedChinaRating extends Rating {

  get voyageLengthFactor() {
    let result = 0
    result += 3
    if (this.voyage.length > 12) result += 1
    if (this.voyage.length > 18) result -= 1

    return result
  }

  get historyLengthFactor() {
    return (this.history.length > 10) ? 1 : 0;
  }


  // write the overriding method in the subclass
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2
    return Math.max(result, 0)
  }
}


function rating(voyage, history) {
  return createRating(voyage, history).value
}

// 建立 a factory function to handle variant
function createRating(voyage, history) {
  if (voyage.zone === 'china' && history.some(v => 'china' === v.zone)) {
    return new ExperiencedChinaRating(voyage, history)
  } else {
    return new Rating(voyage, history)
  }
}


///////////////////// TEST or client ///////////////////

const voyage = { zone: 'west-indies', length: 10 }

const history = [
  { zone: 'east-indies', profit: 5 },
  { zone: 'west-indies', profit: 15 },
  { zone: 'china', profit: -2 },
  { zone: 'west-africa', profit: 7 }
]
const myRating = rating(voyage, history)
assert.equal(myRating, 'B')

