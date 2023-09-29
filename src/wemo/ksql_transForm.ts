import R from 'ramda'


let input = [
  {
    'header': {
      'queryId': 'query_1695364209856',
      'schema': '`id` STRING KEY, `subscriptionDay` INTEGER, `tripCount` INTEGER, `statisticAt` TIMESTAMP'
    }
  },

  {
    'row': {
      'columns': [
        '452452', 300, 20, '2023-09-19T15:59:59.000'
      ]
    }
  }
]

let res = ksql_transForm(input)
console.log('=====> res: ', res)


function ksql_transForm(input: any) {

  try {
    let data = input[1].row.columns
    let parsedCols = parseKqlSchema(input[0].header.schema)
    return R.zipObj(parsedCols, data)
  } catch (error) {
    console.log(error, 'parse error')
  }


}

function parseKqlSchema(schema: string) {
  let cols = []
  let ptr = 0
  let endOfString = schema.length

  while (ptr < endOfString) {

    let col = ''

    if (schema[ptr] === '\`') {
      ptr += 1

      while (schema[ptr] !== '\`') {
        col += schema[ptr]
        ptr += 1
      }
      cols.push(col)
    }
    ptr++
  }

  return cols
}
