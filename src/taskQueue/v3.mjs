/*
- Migrate Task Queue class internals from promises to async/await
- Original found at:
https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/05-asynchronous-control-flow-patterns-with-promises-and-async-await/05-promises-web-spider-v4/TaskQueue.js
*/

export class TaskQueueV3 {
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

// https://github.com/CurtisSlone/Node-Design-Patterns-Exercises/blob/main/05-Exercises/5.2-TaskQueues/index.js
