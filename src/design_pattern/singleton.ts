class Singleton {
  // use static, 因為這個 instance is associated with the class itself rather than with instances of the class.
  // and we only want to have only one instance for this class
  private static instance: Singleton;

  private constructor() {
    // Private constructor to prevent external instantiation
  }

  // use static since
  public static getInstance(): Singleton {
    // 如果沒有才 new 新的，不然就返回本來的那個
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod(): void {
    console.log("Singleton method called");
  }
}

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

// same instance
console.log(instance1 === instance2); // true

instance1.someMethod(); // Output: Singleton method called
instance2.someMethod(); // Output: Singleton method called

export {};
