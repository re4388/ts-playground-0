


function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`)
  renderPhoto(outStream, person.photo)
  emitPhotoData(outStream, person.photo)
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

// 先把要拉出來的拉出來，先不要改動到 caller
function emitPhotoData(outStream, photo) {
  zztmp(outStream, photo)
  outStream.write(`<p>location: ${photo.location}</p>\n`)
}

function zztmp(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`)
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`)
}
