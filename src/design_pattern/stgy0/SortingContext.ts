import { Sorting } from './interface'

export class SortingContext {
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
