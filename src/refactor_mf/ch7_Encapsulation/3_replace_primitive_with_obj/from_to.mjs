// from

orders.filter(order =>
  order.priority === 'high' ||
  order.priority === 'rush'
)



// to

// 把 priority 的 string 转换成 Priority 对象

orders.filter(
  order => order.priority.higherThan(new Priority("normal"))
)


/**
 * why?
 *
 * Often, in early stages of development you make decisions about representing simple facts as simple data items, such as numbers or strings.
 *
 * As development proceeds, those simple items aren’t so simple anymore. A telephone number may be represented as a string for a while, but later it will need special behavior for formatting, extracting the area code, and the like. This kind of logic can quickly end up being duplicated around the code base, increasing the effort whenever it needs to be used.
 *
 * As soon as I realize I want to do something other than simple printing, I like to create a new class for that bit of data.
 *
 * At first, such a class does little more than wrap the primitive — but once I have that class, I have a place to put behavior specific to its needs. These little values start very humble, but once nurtured they can grow into useful tools. They may not look like much, but I find their effects on a code base can be surprisingly large.
 *
 * Indeed many experienced developers consider this to be one of the most valuable refactorings in the toolkit — even though it often seems counterintuitive to a new programmer.
 */
