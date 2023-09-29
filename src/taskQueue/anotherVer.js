class Scheduler {


  constructor(capacity) {
    this.queue = [];
    this.cap = capacity;
    this.count = 0;  // 需要這個來記錄有多少個目前正在跑
  }

  add(ms, id) {

    // 錯誤點。這裡是建立task fn, call it inside run()
    const task = () => {

      // 把 task promise 化: 用 return promise構造函數 包起來
      return new Promise(resolve => {

        // 這裡用 setTimeout 設定一個delay的非同步操作
        setTimeout(() => {
          resolve();
          console.log(id);
        }, ms);

      });
    };

    // 把 promise 化的 task 推入 queue
    this.queue.push(task);
  }



  run() {

    // 應該停止條件, 沒 task了，和超過併發數量
    if (this.queue.length === 0) return
    if (this.count >= this.cap) return

    // 從 queue 拿出task, 開跑囉
    let task = this.queue.shift()
    // 開跑囉，所以加一
    this.count += 1;

    // task 呼叫後，使用 .then 語法來進行呼叫後應該要進行的事情
    task().then(() => {
      this.count -= 1;
      this.run();
    })
  }

  start() {
    // if you just call this.run() here
    // you just get the first one from q and run it and recursively call the next one
    // from q, the result is 1,2,3,4
    // but we want to run up ALL task in queue "nearly" at the same time
    // that's why we want to use for loop or forEach
    // to run all task
    // and since we use setTimeout in each task
    // and all will run up in next event loop
    // so the result will follow the setTimeout ms setting

    // this.run()


    this.queue.forEach(() => this.run())

    // or
    // for (let i = 0; i < this.q.length; i++) {
    // this.run()
    // }
  }
}

const scheduler = new Scheduler(2);

// add task
scheduler.add(1000, '1')
scheduler.add(500, '2')
scheduler.add(300, '3')
scheduler.add(400, '4')

// start
scheduler.start();

// 2
// 3
// 1
// 4
