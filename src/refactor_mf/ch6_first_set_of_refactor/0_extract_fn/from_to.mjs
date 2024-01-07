// from

function printOwing(invoice) {
  printBanner()
  let outstanding = calculateOutstanding()


  //print details
  console.log(`name: ${invoice.customer}`)
  console.log(`amount: ${outstanding}`)
}

// to

function printOwing(invoice) {
  printBanner()
  let outstanding = calculateOutstanding()
  printDetails(outstanding)

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`)
    console.log(`amount: ${outstanding}`)
  }
}

/**
 * Extract Function is one of the most common refactorings I do.
 *
 * (Here, I use the term “function” but the same is true for a method in an object-oriented language, or any kind of procedure or subroutine.)
 *
 * I look at a fragment of code, understand what it is doing, then extract it into its own function named after its purpose.
 *
 * During my career, I’ve heard many arguments about when to enclose code in its own function.
 *
 * Some of these guidelines were based on length:
 *  Functions should be no larger than fit on a screen.
 *
 * Some were based on reuse: Any code used more than once should be put in its own function,
 * but code only used once should be left inline.
 *
 * The argument that makes most sense to me, however, is the separation between intention and implementation.
 *  If you have to spend effort looking at a fragment of code and figuring out what it’s doing, then you should extract it into a function and name the function after the “what.” Then, when you read it again, the purpose of the function leaps right out at you, and most of the time you won’t need to care about how the function fulfills its purpose (which is the body of the function).
 *
 *
 * Once I accepted this principle, I developed a habit of writing very small functions—typically, only a few lines long.
 * To me, any function with more than half-a-dozen lines of code starts to smell, and it’s not unusual for me to have functions that are a single line of code. The fact that size isn’t important was brought home to me by an example that Kent Beck showed me from the original Smalltalk system.
 *
 * Smalltalk in those days ran on black-and-white systems. If you wanted to highlight some text or graphics, you would reverse the video. Smalltalk’s graphics class had a method for this called highlight, whose implementation was just a call to the method reverse. The name of the method was longer than its implementation—but that didn’t matter because there was a big distance between the intention of the code and its implementation.
 *
 * Some people are concerned about short functions because they worry about the performance cost of a function call.
 * When I was young, that was occasionally a factor, but that’s very rare now.
 *
 * Optimizing compilers often work better with shorter functions which can be cached more easily. As always, follow the general guidelines on performance optimization.
 *
 * Small functions like this only work if the names are good, so you need to pay good attention to naming.
 * This takes practice—but once you get good at it, this approach can make code remarkably self-documenting.
 *
 * Often, I see fragments of code in a larger function that start with a comment to say what they do.
 * The comment is often a good hint for the name of the function when I extract that fragment.
 */
