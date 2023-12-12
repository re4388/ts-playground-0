import { CompressionTypes, Kafka, Message, Producer, ProducerBatch, TopicMessages } from 'kafkajs'
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry'




////////////////////////////////////////////////

const KafkaSchemaRegisterId = {
  batInfo: 10

}


const TOPIC_NAME = 'first.messages'
export interface MessageFormat {
  field1: string
  field2: number
}

interface SendMsgOption {key: string, payload: BatInfoMsg, topic: string, schemaId: number}

interface BatInfoMsg {batId: string, batPercent: number, batFcc: string, batCellVol: number[]}



///////////////////////////////////////////////

class ProducerFactory {
  private producer: Producer
  private schemaRegistry: SchemaRegistry

  constructor() {
    this.producer = this.createProducer(),
    this.schemaRegistry = this.createSchemaRegistry()
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  private async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  public async send(sendMsgOption:SendMsgOption): Promise<void> {
    await this.start()
    // 帶上 schema id 來知道要用那個 schema 來編碼
    const encodedPayload = await this.schemaRegistry.encode(sendMsgOption.schemaId, sendMsgOption.payload)

    const kafkaMsg: Message = {
      /**
       * 如果沒有指定分區
       * 則根據 key 的雜湊值 (murmur2) 選擇分區
       */
      key: sendMsgOption.key,
      value: encodedPayload,
      headers: {
        'request-id': '2bfb68bb-893a-423b-a7fa-7b568cad5b67',
        'tag': 'my-system',
      }
    }
    await this.producer.send({
      topic: sendMsgOption.topic,
      messages: [kafkaMsg],
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
      timeout: 6000,
      compression: CompressionTypes.GZIP
    })

    await this.shutdown()
  }

  public async sendBatch(messages: MessageFormat[]): Promise<void> {
    await this.start()
    const msg: Message[] = messages.map((message) => {
      return {
        value: JSON.stringify(message)
      }
    })

    const topicMessages: TopicMessages = {
      topic: 'topic1',
      messages: msg
    }

    const batch: ProducerBatch = {
      topicMessages: [topicMessages]
    }

    await this.producer.sendBatch(batch)
    await this.shutdown()
  }


  private createSchemaRegistry(){
    return new SchemaRegistry({ host: 'http://localhost:8081' })
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
      clientId: 'ts-playground-0-producer'
    })


    /**
     * 注意：Kafka 要求交易生產者俱有以下配置以保證 EoS（“Exactly-once-semantics”）：
     *
     * 生產者的 maxInFlightRequests 必須為 1
     * 生產者必須等待所有副本的確認（acks=-1）
     * 生產者必須有無限次重試的機會
     */
    return kafka.producer({
      allowAutoTopicCreation: false,
      /**
       * 事務協調器在主動中止正在進行的事務之前等待來自生產者的事務狀態更新的最長時間（以毫秒為單位）。
       * 如果該值大於代理中的 transaction.max.timeout.ms 設置，則請求將失敗並出現 InvalidTransactionTimeout 錯誤
       */
      transactionTimeout: 30000,
      /**
       * 任何時間可能正在進行的最大請求數。undefined 為沒有限制。
       */
      maxInFlightRequests: 1,

      /**
       * 實驗性功能。
       * 如果啟用，生產者將確保每個訊息只寫入一次。
       * Acks 必須設定為 -1（「全部」）。重試次數預設為 MAX_SAFE_INTEGER。
       */
      idempotent: true
    })


    // non-tx setting
    // return kafka.producer({
    //   allowAutoTopicCreation: false,
    //   /**
    //    * 事務協調器在主動中止正在進行的事務之前等待來自生產者的事務狀態更新的最長時間（以毫秒為單位）。
    //    * 如果該值大於代理中的 transaction.max.timeout.ms 設置，則請求將失敗並出現 InvalidTransactionTimeout 錯誤
    //    */
    //   transactionTimeout: 30000,
    //   /**
    //    * 任何時間可能正在進行的最大請求數。undefined 為沒有限制。
    //    */
    //   maxInFlightRequests: undefined,
    //
    //   /**
    //    * 實驗性功能。
    //    * 如果啟用，生產者將確保每個訊息只寫入一次。
    //    * Acks 必須設定為 -1（「全部」）。重試次數預設為 MAX_SAFE_INTEGER。
    //    */
    //   idempotent: false
    // })
  }
}

const ksqlProducerFactory = new ProducerFactory()


async function kafka_producer() {
  const payload = {
    batId: '3',
    batPercent: 55,
    batFcc: '33',
    batCellVol: [33, 2, 22]
  }

  await ksqlProducerFactory.send({
    key:payload.batId,
    payload:payload,
    topic: TOPIC_NAME,
    schemaId:KafkaSchemaRegisterId.batInfo})
}



main().catch(error => console.log(error))


async function main() {
  await kafka_producer()
}



// async function kafka_producer_batch() {
//   await ksqlProducerFactory.start()
//
//   const messages: MessageFormat[] = [
//     {
//       field1: 'hello world',
//       field2: 41
//     },
//     {
//       field1: 'ola',
//       field2: 42
//     }
//   ]
//   await ksqlProducerFactory.sendBatch(messages)
//
//   await ksqlProducerFactory.shutdown()
// }
