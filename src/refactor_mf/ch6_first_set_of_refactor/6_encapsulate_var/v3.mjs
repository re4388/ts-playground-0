// I then start working on references to defaultOwner. When I see a reference, I replace it with a call to the getting function.
spaceship.owner = getDefaultOwner()

// When I see an assignment, I replace it with the setting function.
setDefaultOwner({ firstName: 'Rebecca', lastName: 'Parsons' })




// If I’m in a situation where I cannot restrict the access to a variable, it may be useful to rename the variable and retest. That won’t prevent future direct access, but naming the variable something meaningful and awkward such as __privateOnly_defaultOwner may help

// defaultOwner.js


let defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' }

export function defaultOwner() {
  return defaultOwnerData
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg
}


// 無關上面的東西，只是要讓上面的 export 不影響其他 module
export {}
