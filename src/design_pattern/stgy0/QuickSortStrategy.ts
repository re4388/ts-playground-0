import { Sorting } from './interface'

class QuickSortStrategy implements Sorting {
  sort(data: number[]): number[] {
    // Implementation of Quick Sort algorithm
    return data.sort((a, b) => a - b);
  }
}



const quickSortStrategy = new QuickSortStrategy();
export default quickSortStrategy

