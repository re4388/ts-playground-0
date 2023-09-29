import { Todo } from './todo'

export class TodoList {
  private readonly todoList: Todo[];

  constructor(todos: Todo[]) {
    this.todoList = todos
  }

  public show(): string[] {
    console.log("=====> this.todoList: ", this.todoList);
    let result = []
    for (const todo of this.todoList) {
      if(todo.getIsChecked() === true) continue
      result.push(todo.getContent())
    }

    return result
  }
}
