import { promises as fsPromises } from 'fs'
// import { TaskQueue } from './v1.mjs'
import { TaskQueue } from './v2.mjs'


const concurrency = 2
const queue = new TaskQueue(concurrency)
runTask(queue)

function runTask (queue) {

  const taskLogic = () => {
    return fsPromises.readFile('./a1.txt', 'utf8')
      .catch((err) => {
        if (err.code !== 'ENOENT') {
          throw err
        }
      })
  }

  queue
    .runTask(taskLogic)
    .then(content => console.log(content))
}