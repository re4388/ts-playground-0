import events from 'events'


export function tryEventEmitter() {
  let emitter = new events.EventEmitter()

  emitter.on('knock', function() {
    console.log('Who\'s there?')
  })

  emitter.on('knock', function() {
    console.log('Go away!')
  })

  emitter.emit('knock')
}

