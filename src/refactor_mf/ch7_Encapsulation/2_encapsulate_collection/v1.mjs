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
    return this._courses
  }

  set courses(aList) {
    this._courses = aList
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
