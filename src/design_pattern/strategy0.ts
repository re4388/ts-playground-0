/**
 * the Strategy design pattern often utilizes the Composition design pattern.
 * In the Strategy pattern, different algorithms or strategies are encapsulated in separate classes,
 * and these strategies can be composed or injected into a context object to provide different behaviors.
 *
 * The Composition design pattern is commonly used to establish the relationship between
 * the context object and the strategy objects. The context object holds a reference to an interface
 * or abstract class representing the strategy, and at runtime, the appropriate strategy implementation
 * is composed into the context object.
 */

interface Sorting {
  sort(data: number[]): number[];
}

class QuickSortStrategy implements Sorting {
  sort(data: number[]): number[] {
    // Implementation of Quick Sort algorithm
    return data.sort((a, b) => a - b);
  }
}

class BubbleSortStrategy implements Sorting {
  sort(data: number[]): number[] {
    // Implementation of Bubble Sort algorithm
    // ...
    return data;
  }
}

class SortingContext {
  private strategy: Sorting;

  constructor(strategy: Sorting) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Sorting) {
    this.strategy = strategy;
  }

  sortData(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// Usage
const quickSortStrategy = new QuickSortStrategy();
const bubbleSortStrategy = new BubbleSortStrategy();

const context = new SortingContext(quickSortStrategy);
const data = [3, 1, 4, 2, 5];
const sortedData = context.sortData(data);
console.log(sortedData); // Output: [1, 2, 3, 4, 5]

context.setStrategy(bubbleSortStrategy);
const sortedData2 = context.sortData(data);
console.log(sortedData2); // Output: [3, 1, 4, 2, 5] (sorted using Bubble Sort)

export {};
