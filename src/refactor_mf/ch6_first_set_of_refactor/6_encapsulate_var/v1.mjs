// Consider some useful data held in a global variable.
let defaultOwner = {
  firstName: 'Martin',
  lastName: 'Fowler'
}

// Like any data, it’s referenced with code like this:
spaceship.owner = defaultOwner

// and updated like this:
defaultOwner = { firstName: 'Rebecca', lastName: 'Parsons' }


// To do a basic encapsulation on this
// I start by defining functions to read and write the data.
function getDefaultOwner() {
  return defaultOwner
}

function setDefaultOwner(arg) {
  defaultOwner = arg
}
