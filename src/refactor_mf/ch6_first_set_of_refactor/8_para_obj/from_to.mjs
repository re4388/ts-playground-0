// from

function amountInvoiced(startDate, endDate) {
}

function amountReceived(startDate, endDate) {
}

function amountOverdue(startDate, endDate) {
}

// to
function amountInvoiced(aDateRange) {
}

function amountReceived(aDateRange) {
}

function amountOverdue(aDateRange) {
}

/**
 * why
 *
 * I often see groups of data items that regularly travel together, appearing in function after function. Such a group is a data clump, and I like to replace it with a single data structure.
 *
 * Grouping data into a structure is valuable because it makes explicit the relationship between the data items. It reduces the size of parameter lists for any function that uses the new structure. It helps consistency since all functions that use the structure will use the same names to get at its elements.
 *
 * But the real power of this refactoring is how it enables deeper changes to the code. When I identify these new structures, I can reorient the behavior of the program to use these structures. I will create functions that capture the common behavior over this data — either as a set of common functions or as a class that combines the data structure with these functions.
 *
 * This process can change the conceptual picture of the code, raising these structures as new abstractions that can greatly simplify my understanding of the domain. When this works, it can have surprisingly powerful effects — but none of this is possible unless I use Introduce Parameter Object to begin the process.
 */
