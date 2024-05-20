// The cluster module is needed in the parent process.
const cluster = require('cluster')

console.log(`master pid=${process.pid}`)

// Override the default application entry point of __filename.
cluster.setupMaster({
  exec: __dirname + '/cluster-fibonacci.js'
})

// cluster.fork() is called once for each time a worker needs to be created. This code produces two workers.
cluster.fork()
cluster.fork()

// Several events that cluster emits are listened to and logged.
cluster
  .on('disconnect', (worker) => {
    console.log('disconnect', worker.id)
  })
  .on('exit', (worker, code, signal) => {
    console.log('exit', worker.id, code, signal)
    // with this line, after kill <pid> trigger this event, child process will be fork again
    // so the only way to permanently kill the children is to kill the master.
    cluster.fork()
  })
  .on('listening', (worker, { address, port }) => {
    console.log('listening', worker.id, `${address}:${port}`)
  })
