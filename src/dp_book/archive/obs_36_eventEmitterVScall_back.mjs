import { EventEmitter } from 'events'


/**
 * eventEmitter vs callback
 *
 * the difference is the semantic
 * callback: use when the result is returned in async way
 * eventEmitter: use when you want to communicate between notifier and listener
 *
 * event emitter got many code, but provide more feature if that's what you need
 * (maybe cb can achieve these, but you will make code more unnecessary complicate)
 *
 * - cb can only notify on one particular cb, but you can register many listener to the same event
 * - eventEmitter can handle different type of event
 * - The EventEmitter should be used when the same event can occur multiple times, or may not occur at all. A callback, in fact, is expected to be invoked exactly once, whether the operation is successful or not.
 */


function helloEvents () {
  const eventEmitter = new EventEmitter()
  setTimeout(() => eventEmitter.emit('complete', 'hello world'), 100)
  return eventEmitter
}
helloEvents().on('complete', message => console.log(message))


function helloCallback (cb) {
  setTimeout(() => cb(null, 'hello world'), 100)
}


helloCallback((err, message) => console.log(message))