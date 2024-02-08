const { workerData, parentPort } = require('worker_threads');
// workerData 為從母進程傳送過來的資料

const nums = workerData.nums;
const start = workerdata.start;
const end = workerdata.end;

let sum = 0;
for (let i=start; i <= end; i++){
  sum += nums[i]
}

// 將運算結果回傳至母進程。
parentPort.postMessage(sum);
