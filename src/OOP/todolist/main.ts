import { UI } from './ui'
import { TodoList } from './todoList'
import { Todo } from './todo'


let t1 = new Todo('call Jack')
let t2 = new Todo('reply May')
t1.setChecked()
t2.update('reply later')

let tl = new TodoList([t1, t2])
let res = UI.showTodoList(tl)
console.log("=====> res: ", res);
