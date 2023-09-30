import readline from 'readline'
import fs from 'fs'

// Replace 'your_file.txt' with the path to your text file
const filePath = './file1.txt'

// Create a readable stream for the file
const fileStream = fs.createReadStream(filePath)

// Create a readline interface
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity // To handle both \r\n and \n line endings
})

const res: number[] = []


let sum: number = 0
// Define a callback function to be executed for each line
rl.on('line', (line) => {
  if (`${line}` !== '') {
    sum += Number(`${line}`)
  }


  if (`${line}` === '') {
    res.push(sum)
    sum = 0
  }


})

// Handle the end of the file
rl.on('close', () => {
  console.log('End of file reached.')
  res.push(sum) // 記得處理最後一個，判斷條件不同，不是用空字串
  console.log('=====> final res: ', res)
  console.log('=====> res: ', Math.max(...res))


  let sortedRes = res.sort((a, b) => b-a)
  console.log("=====> sortedRes: ", sortedRes);


  const top3 = sortedRes.slice(0, 3)
  const top3Sum = top3.reduce((prev, cur)=>prev+cur, 0)
  console.log("=====> top3: ", top3Sum);


})







