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


/**
 * Breaking the inheritance link finishes the basic Replace Superclass with Delegate refactoring, but there is something more I need to do in this case.
 *
 * The refactoring shifts the role of the catalog item to that of a component of scroll;
 *
 * each scroll contains a unique instance of a catalog item. In many cases where I do this refactoring, this is enough.
 *
 * However, in this situation a better model is to link the greyscale catalog item to the six scrolls in the library that are copies of that writing. Doing this is, essentially, Change Value to Reference (256).
 *
 * There’s a problem that I have to fix, however, before I use Change Value to Reference (256).
 *
 * 讓每一個 scroll 可以共享 同一個 item id
 *
 * In the original inheritance structure, the scroll used the catalog item’s ID field to store its ID.
 *
 * But if I treat the catalog item as a reference, it needs to use that ID for the catalog item ID rather than the scroll ID.
 *
 * This means I need to create an ID field on scroll and use that instead of one in catalog item.
 */
class Scroll  {
  constructor(id, title, tags, dateLastCleaned) {
    // 建立自己的 id
    this._id = id;
    this._catalogItem = new CatalogItem(id, title, tags)
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



// load routine...
const scrolls = aDocument.map(record => new Scroll(
    record.id,
    record.catalogData.title,
    record.catalogData.tags,
    LocalDate.parse(record.lastCleaned)
  ));
