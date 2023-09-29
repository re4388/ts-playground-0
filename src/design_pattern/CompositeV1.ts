
// https://www.jmalvarez.dev/posts/composite-pattern-typescript

interface Component {
  render: () => void;
}

// leaf
class SimpleText implements Component {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public render() {
    console.log("Rendering text:", this.text);
  }
}


// leaf
class SimpleImage implements Component {
  private src: string;

  constructor(src: string) {
    this.src = src;
  }

  public render() {
    console.log("Rendering image:", this.src);
  }
}


class Block implements Component {
  private children: Component[] = [];

  public add(child: Component): void {
    this.children.push(child);
  }

  public render() {
    this.children.forEach((child) => child.render());
  }
}


function clientA() {
  const block = new Block();
  block.add(new SimpleText("Hello"));
  block.add(new SimpleImage("https://example.com/image.png"));

  block.render();

}

// clientA()


function clientB() {
  const nestedBlock = new Block();
  nestedBlock.add(new SimpleText("Hello, check the following image:"));
  nestedBlock.add(new SimpleImage("https://example.com/image.png"));

  const mainBlock = new Block();
  mainBlock.add(nestedBlock);
  mainBlock.add(new SimpleText("Thanks for reading!"));

  mainBlock.render();
}

clientB()
