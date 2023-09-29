import fs from 'fs'

const textToWrite = new Date().toISOString() + '\n'

// Replace 'output.txt' with the desired file path
const filePath = '/Users/re4388/project/personal/nodets/ts-playground-0/src/test_crontab/cronb_test_tmp.txt'


function run() {

// Write the text into the file
  fs.appendFile(filePath, textToWrite, err => {
    if (err) {
      console.error('Error writing to file:', err)
    } else {
      console.log('Text has been written to the file successfully.')
    }
  })

}

run()

// use `mail` to see the fail reason
// use `exit` to exit the mail
