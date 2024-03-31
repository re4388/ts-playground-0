import { promises as fsPromises } from 'fs'
// import { TaskQueue } from './v1.mjs'
import { TaskQueue } from './v2.mjs'


const concurrency = 2
const queue = new TaskQueue(concurrency)
main(queue)

//////////////////////
function main(queue) {
  const res = queue.runTask(taskLogic)
  console.log("------->res: ", res);

}



function taskLogic() {
  try {
    const res = fsPromises.readFile('./a1.txt', 'utf8')
    return res
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }
}
