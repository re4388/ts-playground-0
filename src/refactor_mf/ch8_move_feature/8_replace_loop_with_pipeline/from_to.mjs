// from

const names = []
for (const i of input) {
  if (i.job === 'programmer') names.push(i.name)
}

// to

const names = input
  .filter(i => i.job === 'programmer').map(i => i.name)


/**
 * why
 *
 * Like most programmers, I was taught to use loops to iterate over a collection of objects. Increasingly, however, language environments provide a better construct: the collection pipeline. Collection Pipelines [mf-cp] allow me to describe my processing as a series of operations, each consuming and emitting a collection. The most common of these operations are map, which uses a function to transform each element of the input collection, and filter which uses a function to select a subset of the input collection for later steps in the pipeline. I find logic much easier to follow if it is expressed as a pipeline — I can then read from top to bottom to see how objects flow through the pipeline.
 */
