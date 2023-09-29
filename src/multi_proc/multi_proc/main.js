const { fork } = require('node:child_process')


const oddProc = fork('./work1.js')
const evenProc = fork('./work2.js')

function run() {
  for (let i = 0; i <= 100; i++) {
    if (i % 2 === 1) {
      oddProc.send(i)
    } else {
      evenProc.send(i)
    }
  }

  oddProc.exit()
  evenProc.exit()
}

run()










