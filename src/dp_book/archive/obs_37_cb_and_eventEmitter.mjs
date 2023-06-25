

/**
 * cb + event emitter
 *
 * This pattern is extremely powerful as it allows us to pass a result asynchronously using a traditional callback,
 * and at the same time return an EventEmitter,
 * which can be used to provide a more detailed account on the status of an asynchronous process.
 *
 * in the wild: [glob - npm](https://www.npmjs.com/package/glob)
 */

// api: const eventEmitter = glob(pattern, [options], callback)

import glob from 'glob'
glob('*.md',
  (err, files) => {
    if (err) {
      return console.error(err)
    }
    console.log(`All files found: ${JSON.stringify(files)}`)
  })
  .on('match', match => console.log(`Match found: ${match}`))