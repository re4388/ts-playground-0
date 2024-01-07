/**
 *
 * setter 不要有太多 data mutation 的 operation
 * 因為我們希望越少 mutate operation 越好
 *
 * keep setter simple
 * and move the complexity to getter
 * 
 */


// from

class ProductionPlan {
  get production() {
    return this._production
  }

  applyAdjustment(anAdjustment) {
    /**
     *
     * very ugly duplication of code:
     * not code duplication
     * this is data duplication
     *
     * the same data: anAdjustment goes into 2 places: this._production and this._adjustments
     * 1. anAdjustment 被推到 this._adjustments
     * 2. anAdjustment 被累積到 this._production
     *
     * is this really necessary?
     *
     *
     */
    this._adjustments.push(anAdjustment)
    this._production += anAdjustment.amount
  }
}


// to
class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }

  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment)

  }
}




/**
 * One of the biggest sources of problems in software is mutable data.
 * Data changes can often couple together parts of code in awkward ways, with changes in one part leading to knock-on effects that are hard to spot.
 * In many situations it’s not realistic to entirely remove mutable data — but I do advocate minimizing the scope of mutable data at much as possible.
 *
 *
 * One way I can make a big impact is by removing any variables that I could just as easily calculate. A calculation often makes it clearer what the meaning of the data is, and it is protected from being corrupted when you fail to update the variable as the source data changes.
 *
 * A reasonable exception to this is when the source data for the calculation is immutable and we can force the result to being immutable too.
 *
 * Transformation operations that create new data structures are thus reasonable to keep even if they could be replaced with calculations.
 *
 * Indeed, there is a duality here between objects that wrap a data structure with a series of calculated properties and functions that transform one data structure into another. The object route is clearly better when the source data changes and you would have to manage the lifetime of the derived data structures. But if the source data is immutable, or the derived data is very transient, then both approaches are effective.
 */

