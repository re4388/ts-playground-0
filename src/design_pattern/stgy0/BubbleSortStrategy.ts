import { Sorting } from './interface'
import { QuickSortStrategy } from './QuickSortStrategy'

class BubbleSortStrategy implements Sorting {
  sort(data: number[]): number[] {
    // Implementation of Bubble Sort algorithm
    // ...
    return data;
  }
}


const bubbleSortStrategy = new BubbleSortStrategy();
export default bubbleSortStrategy
