// from

function base(aReading) {
}

function taxableCharge(aReading) {
}

function calculateBaseCharge(aReading) {
}

// to

class Reading {
  base() {
  }

  taxableCharge() {
  }

  calculateBaseCharge() {
  }
}


/**
 * why
 *
 * Classes are a fundamental construct in most modern programming languages.
 * They bind together data and functions into a shared environment, exposing some of that data and function to other program elements for collaboration.
 * They are the primary construct in object-oriented languages, but are also useful with other approaches too.
 *
 * When I see a group of functions that operate closely together on a common body of data (usually passed as arguments to the function call), I see an opportunity to form a class.
 *
 * Using a class makes the common environment that these functions share more explicit, allows me to simplify function calls inside the object by removing many of the arguments, and provides a reference to pass such an object to other parts of the system.
 *
 * In addition to organizing already formed functions, this refactoring also provides a good opportunity to identify other bits of computation and refactor them into methods on the new class.
 *
 * Another way of organizing functions together is Combine Functions into Transform (149). Which one to use depends more on the broader context of the program. One significant advantage of using a class is that it allows clients to mutate the core data of the object, and the derivations remain consistent.
 *
 * As well as a class, functions like this can also be combined into a nested function. Usually I prefer a class to a nested function, as it can be difficult to test functions nested within another.
 *
 * Classes are also necessary when there is more than one function in the group that I want to expose to collaborators.
 * Languages that don’t have classes as a first-class element, but do have first-class functions, often use the Function As Object [mf-fao] to provide this capability.
 */
