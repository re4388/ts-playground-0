// from

const orderData = orderString.split(/\s+/)
const productPrice = priceList[orderData[0].split('-')[1]]
const orderPrice = parseInt(orderData[1]) * productPrice

// to

const orderRecord = parseOrder(order)
const orderPrice = price(orderRecord, priceList)

function parseOrder(aString) {
  const values = aString.split(/\s+/)
  return {
    productID: values[0].split('-')[1],
    quantity: parseInt(values[1])
  }
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID]
}

/**
 * why
 *
 * When I run into code that’s dealing with two different things, I look for a way to split it into separate modules.
 *
 * I endeavor to make this split because, if I need to make a change, I can deal with each topic separately and not have to hold both in my head together. If I’m lucky, I may only have to change one module without having to remember the details of the other one at all.
 *
 * One of the neatest ways to do a split like this is to divide the behavior into two sequential phases. A good example of this is when you have some processing whose inputs don’t reflect the model you need to carry out the logic. Before you begin, you can massage the input into a convenient form for your main processing.
 *
 * Or, you can take the logic you need to do and break it down into sequential steps, where each step is significantly different in what it does.
 *
 * The most obvious example of this is a compiler. It’s a basic task is to take some text (code in a programming language) and turn it into some executable form (e.g., object code for a specific hardware). Over time, we’ve found this can be usefully split into a chain of phases: tokenizing the text, parsing the tokens into a syntax tree, then various steps of transforming the syntax tree (e.g., for optimization), and finally generating the object code. 
 *
 * Each step has a limited scope and I can think of one step without understanding the details of others.
 *
 * Splitting phases like this is common in large software; the various phases in a compiler can each contain many functions and classes. But I can carry out the basic split-phase refactoring on any fragment of code — whenever I see an opportunity to usefully separate the code into different phases.
 *
 * The best clue is when different stages of the fragment use different sets of data and functions. By turning them into separate modules I can make this difference explicit, revealing the difference in the code.
 */
