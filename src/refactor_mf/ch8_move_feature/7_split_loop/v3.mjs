function a1() {



  let totalSalary = 0
  for (const p of people) {
    totalSalary += p.salary
  }

  // But the point of Split Loop isn’t what it does on its own but what it sets up for the next move—and I’m usually looking to extract the loops into their own functions. I’ll use Slide Statements (223) to reorganize the code a bit first.
  let youngest = people[0] ? people[0].age : Infinity
  // To split them, I begin with just copying the loop.
  for (const p of people) {
    if (p.age < youngest) youngest = p.age
  }

  return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`
}
