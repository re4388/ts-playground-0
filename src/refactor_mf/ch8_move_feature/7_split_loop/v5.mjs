function a1() {
  return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`
}


function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0)
}

function youngestAge() {
  return Math.min(...people.map(p => p.age));
}

