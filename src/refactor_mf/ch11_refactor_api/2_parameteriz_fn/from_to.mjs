// from


function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1)
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05)
}

// to
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor)
}

/**
 * why
 *
 * If I see two functions that carry out very similar logic with different literal values,
 * I can remove the duplication by using a single function with parameters for the different values.
 * This increases the usefulness of the function, since I can apply it elsewhere with different values.
 */
