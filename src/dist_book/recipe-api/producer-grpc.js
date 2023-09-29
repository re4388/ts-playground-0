// npm install @grpc/grpc-js@1.1 @grpc/proto-loader@0.5
const grpc = require('@grpc/grpc-js')
const loader = require('@grpc/proto-loader')


const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000


// The producer needs access to the .proto file.
// In this case it’s loaded and processed when started, incurring a small startup cost.
const pkg_def = loader.loadSync(__dirname + '/../shared/grpc-recipe.proto')
const recipe = grpc.loadPackageDefinition(pkg_def).recipe
const server = new grpc.Server()


// When a service is defined, an object is provided with properties reflecting the methods defined in the .proto file.
server.addService(recipe.RecipeService.service, {
  // This method correlates with the GetMetaData(Empty) method in the .proto definition.
  getMetaData: (_call, cb) => {
    cb(null, {
      pid: process.pid
    })
  },

  // The getRecipe() method makes use of an object passed in during the request.
  // This object is provided as call.request.
  getRecipe: (call, cb) => {
    if (call.request.id !== 42) {
      return cb(new Error(`unknown recipe ${call.request.id}`))
    }
    cb(null, {
      id: 42, name: 'Chicken Tikka Masala',
      steps: 'Throw it in a pot...',
      ingredients: [
        { id: 1, name: 'Chicken', quantity: '1 lb' },
        { id: 2, name: 'Sauce', quantity: '2 cups' }
      ]
    })
  }
})

server.bindAsync(`${HOST}:${PORT}`,
  // gRPC can use TLS and authentication, but for this example it’s disabled
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err
    server.start()
    console.log(`Producer running at http://${HOST}:${port}/`)
  })