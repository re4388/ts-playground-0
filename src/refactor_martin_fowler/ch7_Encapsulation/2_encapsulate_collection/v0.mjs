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


// client 可以 mutate person.courses的內容, 表示 person 的 this._courses = [] 沒有包好
const courseList = [
  new Course('courseA', true),
  new Course('courseB', false),
  new Course('courseC', true)
]
for (const course of courseList) {
  person.courses.push(course)
}


const numAdvancedCourses = person.courses.filter(c => c.isAdvanced).length
assert.equal(numAdvancedCourses, 2)
