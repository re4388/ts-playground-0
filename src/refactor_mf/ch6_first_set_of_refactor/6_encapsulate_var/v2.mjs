// Consider some useful data held in a global variable.
let defaultOwner = {
  firstName: 'Martin',
  lastName: 'Fowler'
}

// I then start working on references to defaultOwner. When I see a reference, I replace it with a call to the getting function.
spaceship.owner = getDefaultOwner()

// When I see an assignment, I replace it with the setting function.
setDefaultOwner({ firstName: 'Rebecca', lastName: 'Parsons' })


// To do a basic encapsulation on this
// I start by defining functions to read and write the data.
function getDefaultOwner() {
  return defaultOwner
}

function setDefaultOwner(arg) {
  defaultOwner = arg
}
