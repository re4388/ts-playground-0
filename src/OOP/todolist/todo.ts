export class Todo {
  private isChecked = false
  private isDeleted = false
  private content: string
  constructor(content: string) {
    this.content = content
  }


  public update(newContent: string) {
    this.content = newContent
  }

  public delete() {
    this.isDeleted = true

  }

  public getContent() {
    return this.content
  }

  public getIsChecked() {
    return this.isChecked
  }

  public setChecked() {
    this.isChecked = true
  }

  public setUnChecked() {
    this.isChecked = false
  }
}
