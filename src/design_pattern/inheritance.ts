class Shape {
  render(): void {
    console.log("Rendering a shape");
  }
}

// Provides a natural hierarchy: Inheritance represents an "is-a" relationship
// and can provide a clear and intuitive structure for the system.
// 但是不同於 composition, this is a strictly coupling
// you can't just like composition to not inject it
// you setup a "tight coupling"
class Circle extends Shape {
  render(): void {
    console.log("Rendering a circle");
  }
}

class Square extends Shape {
  render(): void {
    console.log("Rendering a square");
  }
}

// Usage
const circle = new Circle();
circle.render(); // Output: Rendering a circle

const square = new Square();
square.render(); // Output: Rendering a square

export {};
