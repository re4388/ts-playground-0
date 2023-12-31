// from

availableVacation(anEmployee, anEmployee.grade)

function availableVacation(anEmployee, grade) {
  // calculate vacation...
}


// to
availableVacation(anEmployee)

function availableVacation(anEmployee) {
  const grade = anEmployee.grade
}

// calculate vacation...


/**
 * why
 *
 * The parameter list to a function should summarize the points of variability of that function, indicating the primary ways in which that function may behave differently.
 *
 *  As with any statement in code, it’s good to avoid any duplication, and it’s easier to understand if the parameter list is short.
 *
 *  If a call passes in a value that the function can just as easily determine for itself, that’s a form of duplication—one that unnecessarily complicates the caller which has to determine the value of a parameter when it could be freed from that work.
 *
 *  My usual habit is to simplify life for callers, which implies moving responsibility to the function body—but only if that responsibility is appropriate there.
 *
 *
 *  The most common reason to avoid Replace Parameter with Query is if removing the parameter adds an unwanted dependency to the function body—forcing it to access a program element that I’d rather it remained ignorant of. This may be a new dependency, or an existing one that I’d like to remove.
 *
 * The safest case for Replace Parameter with Query is when the value of the parameter I want to remove is determined merely by querying another parameter in the list.
 *
 * One thing to watch out for is if the function I’m looking at has referential transparency—that is, if I can be sure that it will behave the same way whenever it’s called with the same parameter values. Such functions are much easier to reason about and test, and I don’t want to alter them to lose that property. So I wouldn’t replace a parameter with an access to a mutable global variable.
 *
 *
 *
 */
