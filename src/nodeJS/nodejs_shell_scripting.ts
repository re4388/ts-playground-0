// https://exploringjs.com/nodejs-shell-scripting/ch_web-streams.html#byte-streams
import * as R from 'ramda'

run()

async function run() {
  const response = await fetch('https://example.com');
  const readableByteStream = response.body;
  if(R.isNil(readableByteStream)) return

  const readableStream = readableByteStream.pipeThrough(
    new TextDecoderStream('utf-8')) as unknown as NodeJS.ReadableStream

  for await (const stringChunk of readableStream) {
    console.log(stringChunk);
  }

}
