function a1() {
  let youngest = people[0] ? people[0].age : Infinity

  let totalSalary = 0
  for (const p of people) {
    totalSalary += p.salary
  }

  // To split them, I begin with just copying the loop.
  for (const p of people) {
    if (p.age < youngest) youngest = p.age
  }

  return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`
}
