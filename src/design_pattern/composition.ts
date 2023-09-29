interface Renderer {
  render(): void;
}

// we abstract out the renderer concept
class CircleRenderer implements Renderer {
  render(): void {
    console.log("Rendering a circle");
  }
}

class SquareRenderer implements Renderer {
  render(): void {
    console.log("Rendering a square");
  }
}

class Shape {
  private renderer: Renderer;

  // composition provide better flexibility compared to inheritance
  // here, you can just compose w/ other object/instance you want
  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  // reuse part
  renderShape(): void {
    this.renderer.render()
  }
}

// Usage
const circleRenderer = new CircleRenderer();
const squareRenderer = new SquareRenderer();

const circle = new Shape(circleRenderer);
circle.renderShape(); // Output: Rendering a circle

const square = new Shape(squareRenderer);
square.renderShape(); // Output: Rendering a square

export {};
