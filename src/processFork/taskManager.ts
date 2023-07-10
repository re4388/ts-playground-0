import {EventEmitter} from 'events'
import {join} from 'path'
import { ProcessPool } from './processPool'
import { ChildProcess } from 'child_process'

// subsetSumFork.js responsible for abstracting a SubsetSum task running in a child process.
// Its role will be communicating with the child process and forwarding the results of the task
// as if they were coming from the current application.
const workerFile = join(__dirname, 'worker.ts')


// you need to have file path to spawn a child process in node.js
// we wana control how many process in a pool, so poolMax is another arument
const pool = new ProcessPool(workerFile, 2)


export class taskManager extends EventEmitter {
  private readonly sum: number
  private readonly set:number[]

  constructor(sum: number, set: number[]) {
    super()
    this.sum = sum
    this.set = set
  }

  async start() {

    // use process pool to get a process
    const childProc = (await pool.acquire()) as ChildProcess

    // send stuff to child process (single file that one, which represent a separate proc)
    childProc.send({sum: this.sum, set: this.set})

    // when we receive event..
    const onMessage = (msg: {event: string, data: unknown}) => {
      // if the event is end, do some clean up stuff
      if (msg.event === 'end') {
        childProc.removeListener('message', onMessage)
        pool.release(childProc)
      }

      // The worker produces messages in the format {event, data},
      // allowing us to seamlessly forward (re-emit) any event produced by the child process.
      this.emit(msg.event, msg.data)
    }

    childProc.on('message', onMessage)
  }
}
