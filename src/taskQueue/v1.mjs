export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  runTask(asyncTask) {

    return new Promise((resolve, reject) => {

      const taskInvoker = () => {
        return asyncTask().then(resolve, reject)
      }

      this.queue.push(taskInvoker)

      // defer this.next call to a subsequent run of the event loop to guarantee that task is always invoked asynchronously
      process.nextTick(this.next.bind(this))
    })
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {

      const taskInvoker = this.queue.shift()

      // When the wrapper function we queued is finally run
      // we execute the task we have received as the input, and we forward its results—fulfilment value
      // or rejection reason—to the outer Promise, the one we return from the runTask() method.
      taskInvoker().finally(() => {
        // update count either fulfill or reject
        this.running--
        this.next() // call itself, recursive as long as the while condition met
      })

      this.running++
    }
  }
}



/*
- Migrate Task Queue class internals from promises to async/await
- Original found at:
https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/05-asynchronous-control-flow-patterns-with-promises-and-async-await/05-promises-web-spider-v4/TaskQueue.js
*/

export class TaskQueue_async_await_Ver {
  constructor (concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  runTask (task) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try{
          resolve(task())
        } catch (err) {
          reject(err)
        }
      })
      /*
        Was using Process.nextTick for async functionality
        The next() function needed to be async using async keyword
      */
      this.next()
    })
  }

  async next () {
    while (this.running < this.concurrency && this.queue.length) {
      /*
      If function did not await next task, it would execute only parent
      link. adding the await keyword to task added the complete async functionality
      */
      const task = this.queue.shift()
      await task
      task().finally(() => {
        this.running--
        this.next()
      })
      this.running++
    }
  }
}
