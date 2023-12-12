


function streamAsyncIterator(stream: ReadableStream) {
  const reader = stream.getReader();

  return {
    next() {
      return reader.read();
    },
    return() {
      reader.releaseLock();
      return {};
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

type Header = {
  queryId: string,
  columnNames: string[],
  columnTypes: string[],
};

const streamResponse = async () => {
  const body = {
    ksql: "SELECT * from MOVEMENTS WHERE person='Jack';",
    properties: {}
    // properties: {
    //   'auto.offset.reset': 'earliest',
    // }
  };

  const ret = await fetch(`http://localhost:8088/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ksqlapi.delimited.v1',
    },
    body: JSON.stringify(body)
  });
  // console.log("=====> ret: ", ret);

  const decoder = new TextDecoder();
  let header: Header;
  // @ts-ignore
  for await (const chunk of streamAsyncIterator(ret.body)) {
    const decoded = decoder.decode(chunk);
    // @ts-ignore
    if (!header) {
      header = JSON.parse(decoded);
      console.log('Header', header);
    } else {
      decoded.split('\n').filter(x => x.trim()).forEach((line) => {
        const parsed = JSON.parse(line);
        // @ts-ignore
        const row = header.columnNames.reduce((acc, k, i) => (acc[k] = parsed[i], acc), {});
        console.log('Row', row);
      });
    }
  }
};

const main = () => {
  streamResponse().catch(err => console.log(err));
};

main();
