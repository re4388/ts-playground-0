import path from 'path'
import { Kafka } from 'kafkajs'
import { avdlToAVSCAsync, SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'

const incomingTopic = 'first.messages'

main().catch(error => console.log(error))


async function main() {
  await kafka_poc_schema()
}


async function kafka_poc_schema() {
  // init component
  const schemaRegistry = new SchemaRegistry({ host: 'http://localhost:8085' })
  const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'ts-playground-0'
  })
  const consumer = kafka.consumer({ groupId: 'ts-playground-0' })


  const run = async () => {
    // 使用 schema 拿到 schema id
    // const schema = await avdlToAVSCAsync(path.join(__dirname, 'batInfo.avdl'))
    // const { id } = await schemaRegistry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })

    await consumer.connect()
    await consumer.subscribe({ topic: incomingTopic, fromBeginning: true })
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

  run().catch(async (e) => {
    console.error(e)
    consumer && (await consumer.disconnect())
    process.exit(1)
  })
}
