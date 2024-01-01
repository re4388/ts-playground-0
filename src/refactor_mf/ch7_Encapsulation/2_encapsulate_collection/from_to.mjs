// from
{
  class Person {
    get courses() {
      return this._courses
    }

    set courses(aList) {
      this._courses = aList
    }

  }
}


// to
{
  class Person {
    get courses() {
      return this._courses.slice()
    }

    addCourse(aCourse) {
    }

    removeCourse(aCourse) {
    }
  }

}


