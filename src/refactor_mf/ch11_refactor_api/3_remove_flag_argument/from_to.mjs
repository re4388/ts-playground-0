// from

function setDimension(name, value) {
  if (name === 'height') {
    this._height = value
    return
  }
  if (name === 'width') {
    this._width = value
    return
  }
}


// to
function setHeight(value) {
  this._height = value
}

function setWidth(value) {
  this._width = value
}

/**
 * why
 *
 * 還有其他 form like:
 * bookConcert(aCustomer, true) // boolean
 * bookConcert(aCustomer, CustomerType.PREMIUM); // enum
 * bookConcert(aCustomer, "premium"); // string
 *
 *
 * I dislike flag arguments because they complicate the process of understanding what function calls are available and how to call them.
 *
 * To be a flag argument, the callers must be setting the boolean value to a literal value, not data that’s flowing through the program. Also, the implementation function must be using the argu- ment to influence its control flow, not as data that it passes to further functions.
 *
 * Boolean flags are even worse since they don’t convey their meaning to the reader—in a function call, I can’t figure out what true means.
 *
 *
 * Removing flag arguments doesn’t just make the code clearer — it also helps my tooling. Code analysis tools can now more easily see the difference between calling the logicA and calling logicB, not a flag with control flow in the fn
 *
 *
 *
 */
