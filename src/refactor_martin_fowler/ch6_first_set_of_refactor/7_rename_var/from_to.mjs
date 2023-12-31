// from

let a = height * width;


// to
let area = height * width;

/**
 * why
 *
 * Naming things well is the heart of clear programming.
 * 
 * Variables can do a lot to explain what I’m up to — if I name them well.
 *
 * But I frequently get my names wrong — sometimes because I’m not thinking carefully enough, sometimes because my understanding of the problem improves as I learn more, and sometimes because the program’s purpose changes as my users’ needs change.
 *
 * Even more than most program elements, the importance of a name depends on how widely it’s used. A variable used in a one-line lambda expression is usually easy to follow — I often use a single letter in that case since the variable’s purpose is clear from its context.
 *
 * Parameters for short functions can often be terse for the same reason, although in a dynamically typed language like JavaScript, I do like to put the type into the name (hence parameter names like aCustomer).
 *
 * Persistent fields that last beyond a single function invocation require more careful naming. This is where I’m likely to put most of my attention.
 */
