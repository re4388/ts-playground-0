// from
emitPhotoData(outStream, person.photo)

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`)
  outStream.write(`<p>location: ${photo.location}</p>\n`)
}

// to
emitPhotoData(outStream, person.photo)
outStream.write(`<p>location: ${person.photo.location}</p>\n`)

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`)
}

/**
 * why
 *
 * inverse of: Move Statements into Function (213)
 *
 * Functions are the basic building block of the abstractions we build as programmers.
 *
 * And, as with any abstraction, we don’t always get the boundaries right. As a code base changes its capabilities — as most useful software does — we often find our abstraction boundaries shift.
 * For functions, that means that what might once have been a cohesive, atomic unit of behavior becomes a mix of two or more different things.
 *
 *
 * One trigger for this is when common behavior used in several places needs to vary in some of its calls. Now, we need to move the varying behavior out of the function to its callers. In this case, I’ll use Slide Statements (223) to get the varying behavior to the beginning or end of the function and then Move Statements to Callers. Once the varying code is in the caller, I can change it when necessary.
 *
 * Move Statements to Callers works well for small changes, but sometimes the boundaries between caller and callee need complete reworking. In that case, my best move is to use Inline Function (115) and then slide and extract new functions to form better boundaries.
 */
