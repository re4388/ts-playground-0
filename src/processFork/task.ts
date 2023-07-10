import { EventEmitter } from 'events'

export class Task extends EventEmitter {
  private sum
  private set:number[]
  private totalSubsets


  constructor (sum: number, set: number[]) {
    super()
    this.sum = sum
    this.set = set
    this.totalSubsets = 0
  }

  // mimic cpu-intensive work
  _combine (set: number[], subset: number[]) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i])
      this._combine(set.slice(i + 1), newSubset)
      this._processSubset(newSubset)
    }
  }

  _processSubset (subset: number[]) {
    console.log('Subset', ++this.totalSubsets, subset)
    const res = subset.reduce((prev, item) => (prev + item), 0)
    if (res === this.sum) {
      // when we find the answer, send `match` event
      this.emit('match', subset)
    }
  }

  start () {
    this._combine(this.set, [])
    this.emit('end')
  }
}
