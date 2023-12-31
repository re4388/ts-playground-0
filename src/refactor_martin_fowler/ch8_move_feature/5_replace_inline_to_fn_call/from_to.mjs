// from

let appliesToMass = false
for (const s of states) {
  if (s === 'MA') appliesToMass = true
}
// to
appliesToMass = states.includes('MA')

/**
 * why
 *
 * Functions allow me to package up bits of behavior. This is useful for understand- ing—a named function can explain the purpose of the code rather than its mechanics.
 *
 * It’s also valuable to remove duplication: Instead of writing the same code twice, I just call the function. Then, should I need to change the function’s implementation, I don’t have to track down similar-looking code to update all the changes. (I may have to look at the callers, to see if they should all use the new code, but that’s both less common and much easier.)
 *
 * If I see inline code that’s doing the same thing that I have in an existing function, I’ll usually want to replace that inline code with a function call. The exception is if I consider the similarity to be coincidental—so that, if I change the function body, I don’t expect the behavior in this inline code to change. A guide to this is the name of the function. A good name should make sense in place of inline code I have. If the name doesn’t make sense, that may be because it’s a poor name (in which case I use Rename Function (124) to fix it) or because the function’s purpose is different to what I want in this case—so I shouldn’t call it.
 *
 * I find it particularly satisfying to do this with calls to library functions—that way, I don’t even have to write the function body.
 */
