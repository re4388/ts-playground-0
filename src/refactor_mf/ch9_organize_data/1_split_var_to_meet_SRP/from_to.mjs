// from

let temp = 2 * (height + width)
console.log(temp)

// 違背 SRP, two ops share the same variable
temp = height * width
console.log(temp)

// to


const perimeter = 2 * (height + width)
console.log(perimeter)
const area = height * width
console.log(area)



/**
 * Any variable with more than one responsibility should be replaced with multiple variables, one for each responsibility.
 * Using a variable for two different things is very confusing for the reader.
 */
