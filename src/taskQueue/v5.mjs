// https://github.com/kasymbayaman/node.js-design-patterns-solutions/blob/main/05-promises-async-patterns/5.2-taskqueue-promises.js


/* Migrate the TaskQueue class internals from
promises to async/await where possible. Hint: you won't be able to use
async/await everywhere.
*/

export class TaskQueueV5 {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  // cannot be migrated to async because of error handling issues
  run(task) {
    // 這邊動到 process.nextTick, 用 Promise 包
    return new Promise((resolve, reject) => {



      this.queue.push(() => {
        return task().then(resolve, reject)
      })

      // 下一個 tick, 跑 next, 帶上 this ctx
      process.nextTick(this.next.bind(this))
    })
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {

      const task = this.queue.shift()

      this.running++

      try {
        // 不要誤會，這邊的 await 是會等 task 跑完，但是不會卡 main thread
        // 會送到底層multiplex去跑，跑好會callback
        // 另一個函數呼叫時 next(), 可以同時跑另一個 await task()
        // 因此這邊可以同時跑很多個 task(), 直到 沒有 task 送進來 this.queue.length is 0
        // or 達到 concurrency上限 (this.running < this.concurrency)˙
        // 跟 Go 一樣，限制數量平行，都需要自己寫 code 處理
        // 只是 Go 很 explicitly 的用 go routine 去開平行
        // JS implicitly 的，非同步的東西，用特定的寫法，類似 promise.all, or 這邊這樣/*
        // 都是直接丟給 底層的語言實作去處理 multiplexing 和並行，不需要特定寫出來
        // JS 就是預設一個 evt loop 的邏輯去想就好。非同步邏輯，並行處理完，evt loop 會收到 c/*
        // 這邊就會繼續接下去
        // */
        // */
        // */
        await task()
      } catch (e) {
        console.error(e)
      } finally {
        this.running--
        await this.next()
      }
    }
  }
}
