// from

const result = []
result.push(`<p>title: ${person.photo.title}</p>`)
result.concat(photoData(person.photo))

function photoData(aPhoto) {
  return [
    `<p>location: ${aPhoto.location}</p>`,
    `<p>date: ${aPhoto.date.toDateString()}</p>`]
}


// to
const result = []
result.concat(photoData(person.photo))

function photoData(aPhoto) {
  return [
    `<p>title: ${aPhoto.title}</p>`, `<p>location: ${aPhoto.location}</p>`, `<p>date: ${aPhoto.date.toDateString()}</p>`
  ]
}


/**
 * why
 *
 * Removing duplication is one of the best rules of thumb of healthy code.
 * If I see the same code executed every time I call a particular function, I look to combine that repeating code into the function itself.
 * That way, any future modifications to the repeating code can be done in one place and used by all the callers.
 * Should the code vary in the future, I can easily move it (or some of it) out again with Move Statements to Callers (217).
 *
 * I move statements into a function when I can best understand these statements as part of the called function.
 * If they don’t make sense as part of the called function, but still should be called with it, I’ll simply use Extract Function (106) on the statements and the called function.
 *
 *
 * That’s essentially the same process as I describe below, but without the inline and rename steps.
 * It’s not unusual to do that and then, after later reflection, carry out those final steps.
 */
