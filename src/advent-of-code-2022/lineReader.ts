import { createReadStream } from 'node:fs'
import { createInterface } from 'readline/promises'

export class LineReader {
  private readonly filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }


  public async *processFile() {
    const fileStream = createReadStream(this.filePath)
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      yield line;
    }

    console.log('End of file reached.')
  }
}


