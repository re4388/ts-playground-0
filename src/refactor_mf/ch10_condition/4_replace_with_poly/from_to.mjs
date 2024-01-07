// from

function a1() {
  switch (bird.type) {
    case 'EuropeanSwallow':
      return 'average'
    case 'AfricanSwallow':
      return (bird.numberOfCoconuts > 2) ? 'tired' : 'average'
    case 'NorwegianBlueParrot':
      return (bird.voltage > 100) ? 'scorched' : 'beautiful'
    default:
      return 'unknown'
  }
}

// to
class EuropeanSwallow {
  get plumage() {
    return 'average'
  }
}
  class AfricanSwallow {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? 'tired' : 'average'
  }
}
  class NorwegianBlueParrot {
  get plumage() {
    return (this.voltage > 100) ? 'scorched' : 'beautiful'
  }
}


/**
 * Complex conditional logic is one of the hardest things to reason about in programming, so I always look for ways to add structure to conditional logic.
 *
 * Often, I find I can separate the logic into different circumstances —high-level cases — to divide the conditions.
 *
 * Sometimes it’s enough to represent this division within the structure of a conditional itself, but using classes and polymorphism can make the separation more explicit.
 *
 * A common case for this is where I can form a set of types, each handling the conditional logic differently. I might notice that books, music, and food vary in how they are handled because of their type. This is made most obvious when there are several functions that have a switch statement on a type code. In that case, I remove the duplication of the common switch logic by creating classes for each case and using polymorphism to bring out the type-specific behavior.
 *
 * Another situation is where I can think of the logic as a base case with variants. The base case may be the most common or most straightforward. I can put this logic into a superclass which allows me to reason about it without having to worry about the variants. I then put each variant case into a subclass, which I express with code that emphasizes its difference from the base case.
 *
 * Polymorphism is one of the key features of object-oriented programming — and, like any useful feature, it’s prone to overuse.
 * I’ve come across people who argue that all examples of conditional logic should be replaced with polymorphism. I don’t agree with that view.
 *
 * Most of my conditional logic uses basic conditional statements—if/else and switch/case.
 * But when I see complex conditional logic that can be improved as discussed above, I find polymorphism a powerful tool.
 */
