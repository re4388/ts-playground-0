// https://github.com/levanchien/Node.js-Design-Patterns-Exercise/blob/master/chap-05/5.2/TaskQueueAsyncAwait.mjs


export class TaskQueueV4 {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  /**
   * 這邊進行三件事情
   * 1. 定義 task invoker
   * 2. 塞 task
   * 3. 把 this.next 塞入 下一個 micro queue
   */
  addTaskIntoQueueAndKickOff(task) {

    // 下面混了同步和非同步，因此我們全部用 promise 包起來
    return new Promise((resolve, reject) => {

      // 定義塞 task的 task invoker
      async function taskInvoker() {
        try {
          const result = await task()
          return resolve(result)
        } catch (error) {
          return reject(error)
        }
      }


      // 塞 task
      this.queue.push(taskInvoker)
      console.log('task just added into queue')


      // 呼叫 this.next 開始跑!
      // 但是我們需要在下一個event loop 再呼叫 this.next
      // why? 因為這邊的職責，也是這一輪的工作，是把 task 塞進 queue
      // 我們還沒有要開始跑
      //
      // 這邊用到 process.nextTick 這個技巧 (會把入參的fn安排在下一個micro queue, and run before all IO event)
      // 另外， this.next 有 bind this, 因為我們希望 this.next 是在可以拿到 this 的 ctx, 因為this.next 裡面會用到
      process.nextTick(this.next.bind(this))

    })
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {
      const taskFn = this.queue.shift()
      this.running++

      try {
        await taskFn()
      } catch (e) {
        console.error(e)
      } finally {
        this.running--
        await this.next()
      }
    }
  }
}
