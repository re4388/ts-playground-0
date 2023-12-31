

/**
 * why
 *
 * When we put code into production, even on people’s devices, we aren’t charged by weight. A few unused lines of code don’t slow down our systems nor take up significant memory; indeed, decent compilers will instinctively remove them. But unused code is still a significant burden when trying to understand how the software works. It doesn’t carry any warning signs telling programmers that they can ignore this function as it’s never called any more, so they still have to spend time understanding what it’s doing and why changing it doesn’t seem to alter the output as they expected.
 * Once code isn’t used any more, we should delete it. I don’t worry that I may need it sometime in the future; should that happen, I have my version control system so I can always dig it out again. If it’s something I really think I may need one day, I might put a comment into the code that mentions the lost code and which revision it was removed in—but, honestly, I can’t remember the last time I did that, or regretted that I hadn’t done it.
 * Commenting out dead code was once a common habit. This was useful in the days before version control systems were widely used, or when they were incon- venient. Now, when I can put even the smallest code base under version control, that’s no longer needed.
 */
