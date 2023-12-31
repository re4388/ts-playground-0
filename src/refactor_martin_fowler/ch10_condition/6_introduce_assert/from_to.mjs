// from

if (this.discountRate){
  base = base - (this.discountRate * base)
}


// to
assert(this.discountRate >= 0)
if (this.discountRate){
  base = base - (this.discountRate * base)
}


/**
 * why
 *
 *
 * Often, sections of code work only if certain conditions are true. This may be as simple as a square root calculation only working on a positive input value. With an object, it may require that at least one of a group of fields has a value in it.
 *
 * Such assumptions are often not stated but can only be deduced by looking through an algorithm. Sometimes, the assumptions are stated with a comment. A better technique is to make the assumption explicit by writing an assertion.
 *
 * An assertion is a conditional statement that is assumed to be always true. Failure of an assertion indicates a programmer error. Assertion failures should never be checked by other parts of the system. Assertions should be written so that the program functions equally correctly if they are all removed; indeed, some languages provide assertions that can be disabled by a compile-time switch.
 *
 * I often see people encourage using assertions in order to find errors. While this is certainly a Good Thing, it’s not the only reason to use them. I find assertions to be a valuable form of communication — they tell the reader something about the assumed state of the program at this point of execution.
 *
 * I also find them handy for debugging, and their communication value means I’m inclined to leave them in once I’ve fixed the error I’m chasing. Self-testing code reduces their value for debugging, as steadily narrowing unit tests often do the job better, but I still like assertions for communication.
 */
