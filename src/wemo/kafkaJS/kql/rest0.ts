import axios, { AxiosRequestConfig } from 'axios'

const data = JSON.stringify({
  ksql: 'SELECT * from ridersNearMountainView WHERE distanceInMiles <= 10;',
  streamsProperties: {
    'ksql.streams.auto.offset.reset': 'earliest'
  }
})

const config: AxiosRequestConfig = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:8088/query',
  headers: {
    'Content-Type': 'application/json'
  },
  data: data
}

interface ResponseData {
  header: {
    queryId: string;
    schema: string;
  };
  row: {
    columns: (number | string[] | bigint)[];
  };
}

axios.request<ResponseData[]>(config)
  .then((response) => {
    const responseDatum = response.data
    for (const responseData of responseDatum) {
      // console.log(responseData)

      if (responseData.header) {
        console.log(responseData.header)
      } else if (responseData.row) {
        console.log(responseData.row)

      } else {
        console.log('shall not happen')
      }
    }
  }).catch((error) => {
  console.log(error)
})
