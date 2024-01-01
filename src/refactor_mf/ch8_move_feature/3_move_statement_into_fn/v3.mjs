function renderPerson(outStream, person) {
  const result = []
  result.push(`<p>${person.name}</p>`)
  result.push(renderPhoto(person.photo))
  // I can now look at the other callers of emitPhotoData and, one by one, replace the
  // calls and the preceding statements with calls to the new function.
  result.push(zznew(person.photo));
  return result.join('\n')
}

function photoDiv(p) {
  return [
    '<div>',

    // I begin by using Extract Function (106) on one of the callers. I’m extracting the statements I want to move into emitPhotoData, together with the call to emitPhotoData itself.
    zznew(p),
    '</div>'
  ].join('\n')
}

function emitPhotoData(aPhoto) {
  const result = []
  result.push(`<p>location: ${aPhoto.location}</p>`)
  result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`)
  return result.join('\n')
}

// Now that I’ve done all the callers, I use Inline Function (115) on emitPhotoData:
function zznew(p) { return [
  `<p>title: ${p.title}</p>`,
  `<p>location: ${p.location}</p>`,
  `<p>date: ${p.date.toDateString()}</p>`,
].join("\n");
}


// This code shows two calls to emitPhotoData, each preceded by a line of code that is semantically equivalent.
// I’d like to remove this duplication by moving the title printing into emitPhotoData.
// If I had just the one caller, I would just cut and paste the code, but the more callers I have, the more I’m inclined to use a safer procedure.
