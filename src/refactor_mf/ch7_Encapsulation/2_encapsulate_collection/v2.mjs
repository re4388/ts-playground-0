// 簡單說就是把 collection encapsulate 起來
// 提供外部 add/remove 等操作
// 另外 getter 要提供的 copy 的一分，不然被 client mutate 到，很難 debug


import assert from 'node:assert'

class Person {
  constructor(name) {
    this._name = name
    this._courses = []
  }

  get name() {
    return this._name
  }

  get courses() {
    // getter 一樣 copy 一份出去, 以免出去又被 mutate 然後影響到這邊的 data
    return this._courses.slice()
  }

  // 如果沒人用 set, 要拿掉這個 method
  // 如果真的需要 serCourses, 把傳過來的複製一個再取代, 讓 assign 過去的 data 和本來傳過來的 data 是兩個
  // 分開的 data, 不然都是同一個
  set courses(aList) {
    this._courses = aList.slice()
  }

  // adding methods to the person class that allow a client to add and remove individual courses.
  addCourse(aCourse) {
    this._courses.push(aCourse)
  }

  removeCourse(aCourse, fnIfAbsent = () => {
    throw new RangeError()
  }) {
    const index = this._courses.indexOf(aCourse)
    if (index === -1) {
      fnIfAbsent()
    } else {
      this._courses.splice(index, 1)
    }
  }
}


class Course {
  constructor(name, isAdvanced) {
    this._name = name
    this._isAdvanced = isAdvanced
  }

  get name() {
    return this._name
  }

  get isAdvanced() {
    return this._isAdvanced
  }

}


// Clients use the course collection to gather information on courses.
const person = new Person('ben')


const courseList = [
  new Course('courseA', true),
  new Course('courseB', false),
  new Course('courseC', true)
]
for (const course of courseList) {
  // change any code that calls modifiers directly on the collection to use new methods.
  person.addCourse(course)
}


const numAdvancedCourses = person.courses.filter(c => c.isAdvanced).length
assert.equal(numAdvancedCourses, 2)
