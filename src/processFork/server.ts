import { createServer } from 'http'
import { taskManager } from './taskManager'

const port = 8081

export async function runForkProcessServer() {
  return new Promise((resolve, reject) => {

    createServer((req, res) => {
      const url = new URL(req.url as string, 'http://localhost')


      // only accept /subsetSum path
      if (url.pathname !== '/subsetSum') {
        res.writeHead(200)
        return res.end(`wrong path\n`)
      }

      const data: number[] = JSON.parse(url.searchParams.get('data') as string)
      const sum: number = JSON.parse(url.searchParams.get('sum') as string)

      res.writeHead(200)


      const task = new taskManager(Number(sum), data)
      task.on('match', match => {
          res.write(`Match: ${JSON.stringify(match)}\n`)
        }
      )
      task.on('end', () => res.end())


      task.start()

    }).listen(port, () => {
      console.log(`server start at port ${port}`)
      resolve(`done`)
      reject('something went wrong')

    })



  })
}


