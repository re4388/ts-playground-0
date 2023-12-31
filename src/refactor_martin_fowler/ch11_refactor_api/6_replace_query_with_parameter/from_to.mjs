// from

targetTemperature(aPlan)

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature
  // rest of function...
}


// to
targetTemperature(aPlan, thermostat.currentTemperature)

function targetTemperature(aPlan, currentTemperature) {
  // rest of function...
}


/**
 * why
 *
 * When looking through a function’s body, I sometimes see references to something in the function’s scope that I’m not happy with. This might be a reference to a global variable, or to an element in the same module that I intend to move away. To resolve this, I need to replace the internal reference with a parameter, shifting the responsibility of resolving the reference to the caller of the function.
 *
 *
 * Most of these cases are due to my wish to alter the dependency relationships in the code —to make the target function no longer dependent on the element I want to parameterize.
 *
 * There’s a tension here between converting everything to parameters, which results in long repetitive parameter lists, and sharing a lot of scope which can lead to a lot of coupling between functions.
 *
 * Like most tricky decisions, it’s not something I can reliably get right, so it’s important that I can reliably change things so the program can take advantage of my increasing understanding.
 *
 *
 * It’s easier to reason about a function that will always give the same result when called with same parameter values — this is called referential transparency.
 *
 * If a function accesses some element in its scope that isn’t referentially transparent, then the containing function also lacks referential transparency. I can fix that by moving that element to a parameter.
 *
 * Although such a move will shift responsibility to the caller, there is often a lot to be gained by creating clear modules with referential transparency.
 *
 * A common pattern is to have modules consisting of pure functions which are wrapped by logic that handles the I/O and other variable elements of a program. I can use Replace Query with Parameter to purify parts of a program, making those parts easier to test and reason about.
 *
 *
 * But Replace Query with Parameter isn’t just a bag of benefits. By moving a query to a parameter, I force my caller to figure out how to provide this value. This complicates life for callers of the functions, and my usual bias is to design interfaces that make life easier for their consumers.
 *
 * In the end, it boils down to allocation of responsibility around the program, and that’s a decision that’s neither easy nor immutable — which is why this refactoring (and its inverse) is one that I need to be very familiar with.
 */
