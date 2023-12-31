


// Now I use Inline Function (115), one call at a time. I start with renderPerson.
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`)
  renderPhoto(outStream, person.photo)
  zztmp(outStream, photo)
  outStream.write(`<p>location: ${photo.location}</p>\n`)
}

// I need to modify the software so that listRecentPhotos renders the location information differently while renderPerson stays the same.
// To make this change easier, I’ll use Move Statements to Callers on the final line.
function listRecentPhotos(outStream, photos) {
  photos
    .filter(p => p.date > recentDateCutoff()).forEach(p => {
    outStream.write('<div>\n')
    emitPhotoData(outStream, p)
    outStream.write('</div>\n')
  })
}

function emitPhotoData(outStream, photo) {
  zztmp(outStream, photo)
  outStream.write(`<p>location: ${photo.location}</p>\n`)
}

function zztmp(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`)
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
}
