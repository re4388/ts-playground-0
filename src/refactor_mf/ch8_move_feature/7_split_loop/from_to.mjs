// from
let averageAge = 0
let totalSalary = 0
for (const p of people) {
  averageAge += p.age
  totalSalary += p.salary
}
averageAge = averageAge / people.length

// to
let totalSalary = 0
for (const p of people) {
  totalSalary += p.salary
}
let averageAge = 0
for (const p of people) {
  averageAge += p.age
}
averageAge = averageAge / people.length

/**
 * why
 *
 * You often see loops that are doing two different things at once just because they can do that with one pass through a loop. But if you’re doing two different things in the same loop, then whenever you need to modify the loop you have to understand both things. By splitting the loop, you ensure you only need to understand the behavior you need to modify.
 *
 * Splitting a loop can also make it easier to use. A loop that calculates a single value can just return that value. Loops that do many things need to return structures or populate local variables.
 *
 * I frequently follow a sequence of Split Loop followed by Extract Function (106).
 *
 * Many programmers are uncomfortable with this refactoring, as it forces you to execute the loop twice. My reminder, as usual, is to separate refactoring from optimization (Refactoring and Performance (64)).
 *
 * Once I have my code clear, I’ll optimize it, and if the loop traversal is a bottleneck, it’s easy to slam the loops back together.
 *
 * But the actual iteration through even a large list is rarely a bottleneck, and splitting the loops often enables other, more powerful, optimizations.
 */
