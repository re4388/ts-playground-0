// from

function base(aReading) {
}

function taxableCharge(aReading) {
}

// to

function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading)
  aReading.baseCharge = base(aReading)
  aReading.taxableCharge = taxableCharge(aReading)
  return aReading
}


/**
 * why
 *
 *
 * 可以把很多 client 的 不同或類似的邏輯，都收在同一個地方管理
 * 好處
 * 1. 統一管理資料的轉換
 * 2. client code can be much simpler
 *
 *
 *
 * Software often involves feeding data into programs that calculate various derived information from it. These derived values may be needed in several places, and those calculations are often repeated wherever the derived data is used. I prefer to bring all of these derivations together, so I have a consistent place to find and update them and avoid any duplicate logic.
 *
 * One way to do this is to use a data transformation function that takes the source data as input and calculates all the derivations, putting each derived value as a field in the output data. Then, to examine the derivations, all I need do is look at the transform function.
 *
 * An alternative to Combine Functions into Transform is Combine Functions into Class (144) that moves the logic into methods on a class formed from the source data. Either of these refactorings are helpful, and my choice will often depend on the style of programming already in the software. But there is one important difference: Using a class is much better if the source data gets updated within the code. Using a transform stores derived data in the new record, so if the source data changes, I will run into inconsistencies.
 *
 * One of the reasons I like to do combine functions is to avoid duplication of the derivation logic. I can do that just by using Extract Function (106) on the logic, but it’s often difficult to find the functions unless they are kept close to the data structures they operate on. Using a transform (or a class) makes it easy to find and use them.
 */
