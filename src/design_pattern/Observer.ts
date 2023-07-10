/**
 * The Observer design pattern is commonly used in scenarios where there is a one-to-many relationship between objects,
 * and changes in one object need to be communicated to multiple other objects.
 *
 * Here are some common use cases for the Observer design pattern:
 * 1. Event-driven systems: The Observer pattern is widely used in event-driven architectures,
 * where an event source emits event, and multiple listeners (observers) are interested in those event.
 * The observers subscribe to the event source and receive notifications when event occur.
 * Examples include GUI frameworks, message queues, and reactive programming libraries.
 *
 * 2. User interface (UI) updates: In graphical user interfaces, the Observer pattern is often used to
 * update different UI components based on changes in a model or data source.
 * The UI components act as observers, and the model or data source acts as the subject.
 * When the underlying data changes, the observers are notified and update their respective UI elements accordingly.
 *
 * 3. Publish-Subscribe systems: The Observer pattern forms the basis of publish-subscribe systems,
 * where publishers produce messages or event, and subscribers consume them.
 * Subscribers (observers) express their interest in specific topics or types of event
 * and receive notifications when relevant messages are published.
 * This pattern is commonly used in messaging systems, real-time data streaming, and event-driven architectures.
 *
 * 4. Logging and auditing: In logging systems, the Observer pattern can be used to notify multiple loggers
 * or auditing components about event or log entries. Each logger or auditing component can perform
 * its specific logging or auditing tasks based on the received notifications.
 *
 * 5. Distributed systems: The Observer pattern is useful in distributed systems to propagate state changes
 * across different nodes or components. When a state change occurs in one component,
 * it can notify other components that are interested in the change, enabling them to update their internal states accordingly.
 *
 * 6. Stock market or financial applications: In financial systems, the Observer pattern can be used to notify
 * multiple subscribers (observers) about changes in stock prices, currency exchange rates, or other market data.
 * Subscribers can then perform various actions based on the received updates, such as updating their own data,
 * triggering trades, or generating reports.
 *
 * Overall, the Observer pattern is valuable in situations where objects need to be loosely coupled and where changes
 * in one object need to be propagated to multiple other objects without explicit dependencies.
 * It enables decoupled communication and provides a flexible and extensible way
 * to handle one-to-many relationships and event-driven scenarios.
 */

interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data: any): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

class ConcreteObserver implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(data: any): void {
    console.log(`Observer ${this.name} received data: ${data}`);
  }
}

// Usage
const subject = new Subject();

const observer1 = new ConcreteObserver("Observer 1");
const observer2 = new ConcreteObserver("Observer 2");

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers("Hello World!");

subject.removeObserver(observer2);

subject.notifyObservers("Goodbye!");

export {};
