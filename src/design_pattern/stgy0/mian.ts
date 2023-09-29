/**
 *
 *
 */
import bubbleSortStrategy  from './BubbleSortStrategy'
import quickSortStrategy from './QuickSortStrategy'
import { SortingContext } from './SortingContext'


// Usage

const data = [3, 1, 4, 2, 5];
const context = new SortingContext(quickSortStrategy);
const sortedData = context.sortData(data);
console.log(sortedData); // Output: [1, 2, 3, 4, 5]




// context.setStrategy(bubbleSortStrategy);
// const sortedData2 = context.sortData(data);
// console.log(sortedData2); // Output: [3, 1, 4, 2, 5] (sorted using Bubble Sort)

export {};
