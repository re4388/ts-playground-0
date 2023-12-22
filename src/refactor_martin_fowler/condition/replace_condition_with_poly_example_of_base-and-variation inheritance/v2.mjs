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

    // 這裡有 china
    if (this.voyage.zone === 'china' && this.hasChinaHistory(this.history)) result -= 2
    return Math.max(result, 0)
  }

  get hasChinaHistory() {
    return this.history.some(v => 'china' === v.zone)
  }

  get voyageProfitFactor() {
    let result = 2
    if (this.voyage.zone === 'china') result += 1
    if (this.voyage.zone === 'east-indies') result += 1

    // 這裡有一樣的邏輯
    if (this.voyage.zone === 'china' && this.hasChinaHistory(this.history)) {
      result += 3
      if (this.history.length > 10) result += 1
      if (this.voyage.length > 12) result += 1
      if (this.voyage.length > 18) result -= 1
    } else {
      if (this.history.length > 8) result += 1
      if (this.voyage.length > 14) result -= 1
    }
    return result
  }


}

// to create an empty subclass to house the variant behavior.
class ExperiencedChinaRating extends Rating {

}



function rating(voyage, history) {
  return createRating(voyage, history).value
}

// 建立 a factory function to return the variant class when needed
function createRating(voyage, history) {
  if (voyage.zone === 'china' && history.some(v => 'china' === v.zone))
    return new ExperiencedChinaRating(voyage, history)
  else return new Rating(voyage, history)
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

