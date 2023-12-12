// eslint-disable-next-line no-console
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import { Kafka } from 'kafkajs'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'

/**
 * 變成一個 lib/module like microService
 *
 * 預期行為：
 * 三個都不同 cg(consumer group) -> 應該都可以各自收到 msg -> checked
 * 三個都是同一個 cg -> 只有一個可以收到 -> checked
 * 三個都是不同的 clientId -> 沒影響，看 cg -> checked
 * 三個都是一樣的 clientId -> 應該跑起來就會跳錯了吧 -> 不會跳錯
 */


async function consumerRun() {
  const incomingTopic = 'first.messages'
  const consumerGroupId = 'a1'
  const clientId = 'server0'


  const schemaRegistry = new SchemaRegistry({ host: 'http://localhost:8081' })
  const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: clientId
  })
  const consumer = kafka.consumer({ groupId: consumerGroupId })
  await consumer.connect()
  // await consumer.subscribe({ topic: incomingTopic, fromBeginning: true })
  await consumer.subscribe({ topic: incomingTopic })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        const decodedMessage = {
          ...message,
          value: await schemaRegistry.decode(message.value)
        }
        console.log('=====> decodedMessage: ', decodedMessage)
      }
    }
  })
}









const port = 3112

export async function runSimpleExpress() {
  return new Promise((resolve, reject) => {

    const app: Express = express()
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    app.listen(port, async () => {
      // debugger
      console.log(`Server is running at http://localhost:${port}`)
      await consumerRun()
    })

  })
}

main().catch(e => console.log(e))

async function main() {
  await runSimpleExpress()
}

