import path from 'path'
import { CompressionTypes, Kafka, Message } from 'kafkajs'
import { avdlToAVSCAsync, SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'
const TOPIC_NAME = 'first.messages'


main().catch(error => console.log(error))


async function main() {

  // const {id }= await registerSchema('./avdl/batInfo.avdl')


  await kafka_poc_schema()

}

async function registerSchema(fileName: string) {
  const schemaRegistry = new SchemaRegistry({ host: 'http://localhost:8085' })
  const batInfoSchema = await avdlToAVSCAsync(path.join(__dirname, fileName))
  // 使用 schema 拿到 schema id
  const { id } = await schemaRegistry.register({ type: SchemaType.AVRO, schema: JSON.stringify(batInfoSchema) })
  return id
}


export async function kafka_poc_schema() {
  const schemaRegistry = new SchemaRegistry({ host: 'http://localhost:8085' })
  const batInfoSchema = await avdlToAVSCAsync(path.join(__dirname, 'batInfo.avdl'))
  const { id } = await schemaRegistry.register({ type: SchemaType.AVRO, schema: JSON.stringify(batInfoSchema) })


  const producer = await createProducer()

  const run = async () => {

    const payload = {
      batId: '2',
      batPercent: 3,
      batFcc: '33',
      batCellVol: [33, 2, 22]
    }
    const encodedPayload = await schemaRegistry.encode(2, payload) // 帶上 schema id 來知道要用那個 schema 來編碼
    const outgoingMessage: Message = {
      /**
       * 如果沒有指定分區
       * 則根據 key 的雜湊值 (murmur2) 選擇分區
       */
      key: payload.batId,
      value: encodedPayload,
      headers: {
        'request-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
        'tag': 'my-system',
      }
    }
    await producer.send({
      topic: TOPIC_NAME,
      messages: [outgoingMessage],
      /**
       * 控制所需的 ack 數量。
       * -1 = 所有同步副本必須確認（預設）
       * 0 = 沒有確認
       * 1 = 僅等待領導者確認
       */
      acks: -1,
      /**
       * 等待 response 的時間（以毫秒為單位）
       */
      timeout: 3000,
      compression: CompressionTypes.GZIP
    })

  }

  run().catch(async (e) => {
    console.error(e)
    producer && (await producer.disconnect())
    process.exit(1)
  })
}


async function createProducer() {
  const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'ts-playground-0-producer'
  })
  const producer = kafka.producer({
    allowAutoTopicCreation: false,
    /**
     * 事務協調器在主動中止正在進行的事務之前等待來自生產者的事務狀態更新的最長時間（以毫秒為單位）。
     * 如果該值大於代理中的 transaction.max.timeout.ms 設置，則請求將失敗並出現 InvalidTransactionTimeout 錯誤
     */
    transactionTimeout: 30000,
    /**
     * 任何時間可能正在進行的最大請求數。undefined 為沒有限制。
     */
    maxInFlightRequests: undefined,

    /**
     * 實驗性功能。
     * 如果啟用，生產者將確保每個訊息只寫入一次。
     * Acks 必須設定為 -1（「全部」）。重試次數預設為 MAX_SAFE_INTEGER。
     */
    idempotent: false
  })

  await producer.connect()

  return producer
}
