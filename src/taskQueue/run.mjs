import { TaskQueueV4 } from './v4.mjs'

const concurrent = 2
const queue = new TaskQueueV4(concurrent)


// 這邊我們可以塞任意數量的 task/work 進入 arr
let arr = []
let numberOfTask = 10
for (let i = 0; i < numberOfTask; i++) {
  // 稍微打亂一下 sec
  // 不過如果打亂 sec, 就無法從結果看出一次跑幾個。
  const randomValue = getRandomValueWithInRange(3, 6);
  arr.push(createTask(randomValue, i))
}

// 這邊用 forEach 來一次性的同步觸發所有的塞入的task
// 這邊的目的只是要把所有的 task 塞入 queue, 另外也會開始跑
arr.forEach(task => queue.addTaskIntoQueueAndKickOff(task))


function createTask(sec, i) {
  return task.bind(this, sec, i)
}



function task(sec, i) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve()
        console.log(`${i} task Resolved after ${sec} sec`)
      }, sec * 1000)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}



function getRandomValueWithInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}





