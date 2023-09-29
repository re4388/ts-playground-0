const awilix = require('awilix')

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

// This is our app code... We can use
// factory functions, constructor functions
// and classes freely.
class UserController {
  // We are using constructor injection.
  constructor(opts) {
    // Save a reference to our dependency.
    this.userService = opts.userService
  }

  // imagine ctx is our HTTP request context...
  getUser(ctx) {
    return this.userService.getUser(ctx.params.id)
  }
}




container.register({
  // Here we are telling Awilix how to resolve a
  // userController: by instantiating a class.
  userController: awilix.asClass(UserController)
})


// We have now wired everything up!
// Let's use it! (use your imagination with the router thing..)
router.get('/api/users/:id', container.resolve('userController').getUser)

