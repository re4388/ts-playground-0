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
    this._lastCleaned = dateLastCleaned
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500
    return this.daysSinceLastCleaning(targetDate) > threshold
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS)
  }

}
