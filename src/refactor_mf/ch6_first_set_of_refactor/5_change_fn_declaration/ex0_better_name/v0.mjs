// Consider this function with an overly abbreved name:
function circum(radius) {
  return 2 * Math.PI * radius
}


// I want to change that to something more sensible.
function circumference(radius) {
  return 2 * Math.PI * radius
}


/**
 * I then find all the callers of circum and change the name to circumference.
 *
 * Different language environments have an impact on how easy it is to find all the references to the old function. Static typing and a good IDE provide the best experience, usually allowing me to rename functions automatically with little chance of error. Without static typing, this can be more involved; even good searching tools will then have a lot of false positives.
 *
 * I use the same approach for adding or removing parameters: find all the callers, change the declaration, and change the callers. It’s often better to do these as separate steps — so, if I’m both renaming the function and adding a parameter, I first do the rename, test, then add the parameter, and test again.
 *
 * A disadvantage of this simple way of doing the refactoring is that I have to do all the callers and the declaration (or all of them, if polymorphic) at once. If there are only a few of them, or if I have decent automated refactoring tools, this is reasonable.
 *
 * But if there’s a lot, it can get tricky. Another problem is when the names aren’t unique — e.g., I want to rename the a changeAddress method on a person class but the same method, which I don’t want to change, exists on an insurance agreement class.
 *
 * The more complex the change is, the less I want to do it in one go like this. When this kind of problem arises, I use the migration mechanics instead.
 * Similarly, if I use simple mechanics and something goes wrong, I’ll revert the code to the last known good state and try again using migration mechanics.
 */
