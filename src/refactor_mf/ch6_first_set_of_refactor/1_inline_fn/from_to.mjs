// from

function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5
}

// to
function getRating(driver) {
  return (driver.numberOfLateDeliveries > 5) ? 2 : 1
}


/**
 * One of the themes of this book is using short functions named to show their intent,
 * because these functions lead to clearer and easier to read code.
 *
 * But sometimes, I do come across a function in which the body is as clear as the name.
 * Or, I refactor the body of the code into something that is just as clear as the name.
 *
 * When this happens, I get rid of the function. Indirection can be helpful, but needless indirection is irritating.
 *
 * I also use Inline Function is when I have a group of functions that seem badly factored.
 * I can inline them all into one big function and then re-extract the functions the way I prefer.
 *
 * I commonly use Inline Function when I see code that’s using too much indirection —
 * when it seems that every function does simple delegation to another function, and I get lost in all the delegation.
 * Some of this indirection may be worthwhile, but not all of it.
 * By inlining, I can flush out the useful ones and eliminate the rest.
 */
