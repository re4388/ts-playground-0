import { log } from 'console'

export function createTaskMain() {


  // as a user, we define our own beloved logic, like below
  const helloWorld = (name: string) => console.log(`hello ${name}`)


  // then we use library provided createTask fn
  // which we can put user defined fn into it
  // we also can setup our own argument
  // and then it will gen a task
  const task = createTask(helloWorld, 'ben')

  //
  // the task we created used in other place, other module..
  task()
}


function createTask(fn: Function, ...args: any[]) {
  // here, we have a lot of logic here
  // maybe this is in another module
  // and most of the time, this is the library code, tooling, code
  return fn.bind(null, ...args)
}



