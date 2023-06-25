import { readFile } from 'fs'

function readJSON(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {

    let parsed

    if (err) {
      // propagate the error and exit the current function
      return callback(err)
    }

    // json.prase 可能會出錯，這邊就要包上 try catch 了
    try {
      // parse the file contents
      parsed = JSON.parse(data)
    } catch (err) {
      // catch parsing errors
      return callback(err)
    }

    // no errors, propagate just the data
    callback(null, parsed)

  })
}

function readJSONThrows(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data)) // <--- 這邊沒有包，而且這邊為 非同步 cb, 因此錯誤直接為跑到 event loop 那邊 跳 非 0 錯誤, app abort, 然後丟到 stdout
  })
}

// 這邊包 try-catch 沒用，因為 錯誤直接為跑到 底層 event loop 那邊然後丟到 stdout
try {
  readJSONThrows('invalid_json.json', (err) => console.error(err))
} catch (e) {
  console.log('This will NOT catch the JSON parsing exception')
}


/**
 * if we catch this excpetion and not process.exit 1, the app is still running
 * but the very reason app have this exception is cuz some async error happend and we have IO issue
 * so you leave the app running and with this inconsistent state, which is not good
 *
 * we shall follow the fail-fast principle in node.js
 *
 * we shall procss.exit1
 * before exit, we also also do some cleanup task and we can also have a supervisor
 * to restart the app, see chapter12, architecture design pattern and scability
 *
 */
process.on('uncaughtException', (err) => {
  console.error(`This will catch at last the JSON parsing exception: ${err.message}`)
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1)
})