import { ChildProcess, fork } from 'child_process'

interface Waiting {
  resolve(value: ChildProcess): void

  reject(value: unknown): void
}


//  Starting a new process is expensive and requires time
//  so keeping them constantly running and ready to handle requests allows us to save time and CPU cycles.
//  Also, the pool will help us limit the number of processes running at the same time
//  to prevent exposing the application to denial-of-service (DoS) attacks.
export class ProcessPool {



  private readonly file
  private readonly concurrentNumber
  private available: ChildProcess[]
  private active: ChildProcess[]
  private waiting: Waiting[]

  constructor(file: string, concurrentNumber: number) {
    this.file = file
    this.concurrentNumber = concurrentNumber

    // pool is the set of running processes ready to be used.
    // 1. when you want to run, pop proc from here
    // 2. when you run is done, push back proc to here
    this.available = []

    // active contains the list of the processes currently being used.
    // when we receive the child proc said it is ready, we push to here
    // may places this list is goes side by side to this.pool
    // this is a bookeeping list to let us to control the pool max -> this.active.length >= this.poolMax -> goes to waiting
    this.active = []

    // waiting contains a queue of callbacks for all those requests
    // that could not be fulfilled immediately because of the lack of an available process.
    // 1. if over the maxPool, goes here
    // 2. also the place we will let it run FIRST when any proc finish
    // 3. if over -> 3.1 no get from pool, 3.2 saving current resolve, reject cb into this list
    this.waiting = []
  }

  // the acquire() method
  // which is responsible for eventually returning a process ready to be used, when one becomes available
  acquire() {
    // why we wrap a promise here?
    // since we have some event listening logic inside, are these are async operations
    // so we need to wrap all logic into this promise ctor and allow the caller to `await` it
    return new Promise((resolveCb, rejectCb) => {

      let child: ChildProcess

      // If we have a process in the pool ready to be used, we simply move process to
      // the active list and then use process to fulfill the outer promise with resolve() cb.
      // so when the promise settle the resolve call back will invoke
      if (this.available.length > 0) {
        child = this.available.pop() as ChildProcess
        this.active.push(child)

        // use resolveCb to return the child process to the caller
        // that is why we can get `childProc` from below line
        // `const childProc = await pool.acquire()
        return resolveCb(child)
      }

      // If there are no available processes in the pool and we have already reached
      // the maximum number of allowed running processes, we have to wait for one to be available.
      // We achieve this by queuing a obj which containing the resolve() and reject() callbacks
      if (this.active.length >= this.concurrentNumber) {
        return this.waiting.push({ resolve: resolveCb, reject: rejectCb })
      }

      // If we haven't reached the maximum number of running processes yet,
      // we create a new one using child_process.fork().
      // ps: a idea to clarify:
      // it's not about parent and child process talk to each other
      // it's about one file, which represent child process, and will talk to the main file
      // in the main file, we will fork a child proc (from the file path), and use that child proc to talk to that file's child proc
      // in this case, this is the main file
      // ref: https://www.geeksforgeeks.org/node-js-process-send-method/
      child = fork(this.file)

      // Then, we wait for the ready message coming from the newly launched process,
      // which indicates that the process has started and is ready to accept new jobs.
      // This message-based channel is automatically provided with all processes started with child_ process.fork().
      // PS: message is the builtin event which trigger when the one-file child proc call process.send
      child.once('message', message => {

        if (message === 'ready') {
          this.active.push(child)
          return resolveCb(child)
        }

        child.kill()
        rejectCb(new Error('Improper process start'))
      })

      // handle exit event
      child.once('exit', code => {
        console.log(`Worker exited with code ${code}`)
        this.active = this.active.filter(w => child !== w)
        this.available = this.available.filter(w => child !== w)
      })


    })
  }

  // The last method of the ProcessPool class is release()
  // whose purpose is to put a process back into the pool once we are done with it:
  release(childProc: ChildProcess) {

    // 如果有 proc 在 waiting list, 拿出來，可以 resolve了
    if (this.waiting.length > 0) {
      const waiting  = this.waiting.shift()
      return waiting?.resolve(childProc)
    }

    // 更新一下目前活躍的 proc
    this.active = this.active.filter(proc => childProc !== proc)

    // 推入 pool
    this.available.push(childProc)
  }
}
