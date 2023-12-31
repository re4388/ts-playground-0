// from

function foundPerson(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === 'Don') {
      return 'Don'
    }
    if (people[i] === 'John') {
      return 'John'
    }
    if (people[i] === 'Kent') {
      return 'Kent'
    }
  }
  return ''
}

// to

function foundPerson(people) {
  const candidates = ['Don', 'John', 'Kent']
  return people.find(p => candidates.includes(p)) || ''
}

/**
 * why?
 *
 * 發現更簡單易懂得的寫法，就應該取代掉
 */
