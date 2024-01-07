class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }

}

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12
  }
}

class Department extends Party {
  // The methods have different names, so I Change Function Declaration (124) to make them the same.
  get annualCost() {
    return this.monthlyCost * 12
  }
}

// I look at both classes and see that they refer to the monthlyCost property which isn’t defined on the superclass, but is present in both subclasses. Since I’m in a dynamic language, I’m OK; if I were in a static language, I’d need to define an abstract method on Party.


export {}
