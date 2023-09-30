type TableColumn = {
  column: string;
  type: 'STRING' | 'INTEGER' | 'TIMESTAMP';
};

let res = parseKqlSchema('`id` STRING KEY, `subscriptionDay` INTEGER, `tripCount` INTEGER, `statisticAt` TIMESTAMP')
console.log('=====> res: ', res)

function parseKqlSchema(schema: string): (TableColumn | undefined)[] {
  try {
    return <TableColumn[]>schema.split(',').map((s) => /`(?<column>\w+)`\s+(?<type>STRING|INTEGER|TIMESTAMP)/.exec(s)?.groups)
  } catch (error) {
    console.error({ error, msg: `parse ksql traversal error` })
    throw error
  }
}

let a1 = [
  { column: 'id', type: 'STRING' },
  {
    column: 'subscriptionDay',
    type: 'INTEGER'
  },
  { column: 'tripCount', type: 'INTEGER' },
  { column: 'statisticAt', type: 'TIMESTAMP' }
]





function kqlTypeConverter(kqlType: string, input: unknown): string | number | Date | undefined {
  switch (kqlType) {
    case `STRING KEY`: {
      return (<string>input).toString()
    }
    case `STRING`: {
      return (<string>input).toString()
    }
    case `INTEGER`: {
      return parseInt(<string>input)
    }
    case `TIMESTAMP`: {
      return new Date(<string>input)
    }
    default: {
      break
    }
  }
}

