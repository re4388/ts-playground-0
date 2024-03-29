function renderPerson(outStream, person) {
  const result = []
  result.push(`<p>${person.name}</p>`)
  result.push(renderPhoto(person.photo))
  result.push(`<p>title: ${person.photo.title}</p>`)
  result.push(emitPhotoData(person.photo))
  return result.join('\n')
}

function photoDiv(p) {
  return [
    '<div>',
    `<p>title: ${p.title}</p>`, emitPhotoData(p),
    '</div>'
  ].join('\n')
}

function emitPhotoData(aPhoto) {
  const result = []
  result.push(`<p>location: ${aPhoto.location}</p>`)
  result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
  return result.join('\n')
}


// This code shows two calls to emitPhotoData, each preceded by a line of code that is semantically equivalent.
// I’d like to remove this duplication by moving the title printing into emitPhotoData.
// If I had just the one caller, I would just cut and paste the code, but the more callers I have, the more I’m inclined to use a safer procedure.
