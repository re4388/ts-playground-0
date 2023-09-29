const { Worker } = require('worker_threads')


// 這一段建立 thread，並且將 workerData 丟給 thread。
function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });

    // 監聽有沒有資料從 thread 傳回來。
    worker.on('message', resolve);
  })
}

// 這裡建立兩個 thread 來並行計算 nums 數組。
// 第一個 thread 負責計算第 0 至 4 個
// 第二個 thread 負責計算第 5 至 8 個
async function run() {
  const nums = [1,3,4,7,8,9,19,11,12];

  const result = await Promise.all([

    runService({
      nums,
      start: 0,
      end: 4
    }),

    runService({
      nums,
      start: 5,
      end: 8
    })
  ])
  return result[0] + result[1];
}

(async () => {
  const res = await run();
  console.log(res);
})()
