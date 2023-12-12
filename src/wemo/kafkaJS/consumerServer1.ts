// eslint-disable-next-line no-console
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'
import { Kafka } from 'kafkajs'

const port = 3113

async function consumerRun() {
  const incomingTopic = 'first.messages'
  const consumerGroupId = 'a1'
  const clientId = 'server1'


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

