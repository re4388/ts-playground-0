// from

class Account {
  get overdraftCharge() {
  }
}

// to

class AccountType {
  get overdraftCharge() {
  }
}

/**
 * why
 *
 * The heart of a good software design is its modularity — which is my ability to make most modifications to a program while only having to understand a small part of it.
 *
 * To get this modularity, I need to ensure that related software elements are grouped together and the links between them are easy to find and understand.
 *
 * But my understanding of how to do this isn’t static — as I better understand what I’m doing, I learn how to best group together software elements. To reflect that growing understanding, I need to move elements around.
 *
 *
 * All functions live in some context; it may be global, but usually it’s some form of a module. In an object-oriented program, the core modular context is a class. Nesting a function within another creates another common context. Different languages provide varied forms of modularity, each creating a context for a function to live in.
 *
 * One of the most straightforward reasons to move a function is when it references elements in other contexts more than the one it currently resides in. Moving it together with those elements often improves encapsulation, allowing other parts of the software to be less dependent on the details of this module.
 *
 * Similarly, I may move a function because of where its callers live, or where I need to call it from in my next enhancement. A function defined as a helper inside another function may have value on its own, so it’s worth moving it to somewhere more accessible. A method on a class may be easier for me to use if shifted to another.
 *
 * Deciding to move a function is rarely an easy decision. To help me decide, I examine the current and candidate contexts for that function. I need to look at what functions call this one, what functions are called by the moving function, and what data that function uses. Often, I see that I need a new context for a group of functions and create one with Combine Functions into Class (144) or Extract Class (182).
 *
 * Although it can be difficult to decide where the best place for a function is, the more difficult this choice, often the less it matters.
 *
 * I find it valuable to try working with functions in one context, knowing I’ll learn how well they fit, and if they don’t fit I can always move them later.
 */
