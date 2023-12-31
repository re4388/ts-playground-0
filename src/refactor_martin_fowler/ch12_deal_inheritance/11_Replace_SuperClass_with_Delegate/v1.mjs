class CatalogItem {
  constructor(id, title, tags) {
    this._id = id
    this._title = title
    this._tags = tags
  }

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  hasTag(arg) {
    return this._tags.includes(arg)
  }
}


// scroll 來自 CatalogItem, 怪怪的，我們來改掉

class Scroll extends CatalogItem {
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags)
    // I begin by creating a property in Scroll that refers to the catalog item, initializing it with a new instance.
    this._catalogItem = new CatalogItem(id, title, tags)
    this._lastCleaned = dateLastCleaned
  }

  // delegate/composition 的成本，就是需要這些 forwarding method
  // I create forwarding methods for each element of the superclass that I use on the subclass.
  get id() {
    return this._catalogItem.id
  }

  get title() {
    return this._catalogItem.title
  }

  hasTag(aString) {
    return this._catalogItem.hasTag(aString)
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500
    return this.daysSinceLastCleaning(targetDate) > threshold
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS)
  }

}
