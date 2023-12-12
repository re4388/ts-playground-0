import avro from 'avsc'
import { avdlToAVSCAsync, SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry'
import path from 'path'

// const schema = {
//   type: 'record',
//   name: 'Transaction',
//   fields: [
//     { name: 'amount', type: 'int' },
//     /**
//      * The time field encodes a timestamp as a long
//      * it would be better if we could deserialize it directly into a JS native Date object.
//      * Avro's logical types help us deserialize/serialize between JS native type and avro type
//      */
//     { name: 'time', type: { type: 'long', logicalType: 'timestamp-millis' } }
//   ]
// }


/**
 * Custom logical type used to encode native Date objects as longs.
 *
 * It also supports reading dates serialized as strings (by creating an
 * appropriate resolver).
 *
 */
class DateType extends avro.types.LogicalType {
  _fromValue(val: string) {
    return new Date(val)
  }

  _toValue(date: Date): number {
    return +date
  }

  _resolve(type: any) {
    if (avro.Type.isType(type, 'long', 'string', 'logical:timestamp-millis')) {
      return this._fromValue
    }
  }
}


async function uploadToRegistry() {
  const schema = await avdlToAVSCAsync(path.join(__dirname, './avdl/tx.avdl'))
  console.log("=====> schema: ", JSON.stringify(schema));
  const options = {
    [SchemaType.AVRO]: {
      logicalTypes: { 'timestamp-millis': DateType }
    }
  }
  const registry = new SchemaRegistry({ host: 'http://localhost:8085' }, options)
  const { id } = await registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(schema) })
  console.log('=====> id: ', id)
}




run().catch((e) => console.log(e))

async function run() {
  // 上傳 schema 到 schema registry 服務
  const schema = await avdlToAVSCAsync(path.join(__dirname, 'tx.avdl'))
  await uploadToRegistry()
  console.log("=====> schema: ", JSON.stringify(schema));


  // get the avro type util
  const type = avro.Type.forSchema(schema,
    {logicalTypes: {'timestamp-millis': DateType}})

  // create a msg
  const message = {
    amount: 32,
    time: new Date('Thu Nov 05 2015 11:38:05 GMT-0800 (PST)')
  }

  const buf = type.toBuffer(message)
  const date = type.fromBuffer(buf).time
  console.log('=====> date: ', date)
  console.log('=====> typeof date: ', date instanceof Date)
}
