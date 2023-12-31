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


class Scroll  {
  // 移除 title and tag
  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned
  }

  get id() {return this._id;}

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



// The first step in Change Value to Reference (256) is finding or creating a repository.
//
// I find there is a repository that I can easily import into the load routine.
//
// The repository supplies catalog items indexed by an ID.
//
// My next task is to see how to get that ID into the constructor of the scroll.
//
// Fortunately, it’s present in the input data and was being ignored as it wasn’t useful when using inheritance.
//
// With that sorted out, I can now use Change Function Declaration (124) to add both the catalog and the catalog item’s ID to the constructor parameters.

// load routine...
const scrolls = aDocument
  .map(record => new Scroll(
    record.id,
    LocalDate.parse(record.lastCleaned),
    record.catalogData.id,
    catalog));
