/**
 * polymorphism 多態
 *
 * A concept in OOP
 * to make code more reusable if use it correctly
 *
 * 建議 is-a 關係才用繼承
 *
 * In this ex, animal, dog and cat, all call `makeSound`
 * but exhibit different behavior, this is polymorphism
 *
 * In TS, we use inheritance and method override to achieve polymorphism
 *
 */

class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  makeSound() {
    console.log('Animal makes a sound')
  }
}

class Dog extends Animal {
  makeSound() {
    console.log('Dog barks')
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('Cat meows')
  }
}

// Create instances of Animal, Dog, and Cat
const animal = new Animal('Animal')
const dog = new Dog('Dog')
const cat = new Cat('Cat')

// Call the makeSound method on each object
animal.makeSound() // Output: Animal makes a sound
dog.makeSound() // Output: Dog barks
cat.makeSound() // Output: Cat meows
