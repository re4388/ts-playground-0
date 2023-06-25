/**
 *
 * The variable thisTakesMemory is referenced in the listener and therefore its memory is retained
 * until the listener is released from emitter,
 * or until the emitter itself is garbage collected,
 * which can only happen when there are no more active references to it, making it unreachable.
 */
const thisTakesMemory = 'A big string....'

const listener = () => {
  console.log(thisTakesMemory)
}
emitter.on('an_event', listener)


//To prevent such a situation, we can release the listener with the removeListener() method of the EventEmitter:
emitter.removeListener('an_event', listener)

