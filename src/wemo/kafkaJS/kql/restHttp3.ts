import * as http2 from 'http2'

class KsqlDBClient {
  private client: http2.ClientHttp2Session

  constructor(ksqlDBBaseUrl: string) {
    this.client = http2.connect(ksqlDBBaseUrl)
    this.client.on('error', (error) => console.error(error))
  }

  request(query: { sql: string }): void {
    const session: http2.ClientHttp2Stream = this.client.request({
      [http2.constants.HTTP2_HEADER_PATH]: '/query-stream',
      [http2.constants.HTTP2_HEADER_METHOD]: 'POST',
      [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'application/vnd.ksql.v1+json'
    })

    session.setEncoding('utf8')
    session.on('data', (queryResult) => {
      console.log('queryResult', queryResult)
    })

    const payload = Buffer.from(JSON.stringify(query))
    session.end(payload)
  }
}


const query = {
  sql: `SELECT * FROM MOVEMENTS EMIT CHANGES;`
}
const client = new KsqlDBClient('http://localhost:8088')
client.request(query)
