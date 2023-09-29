import { TodoList } from './todoList'
import { Todo } from './todo'

export class UI {
  public static showTodoList(todoList: TodoList) {
    return todoList.show()
  }
}
