// import moment from 'moment'
//
//
//
// let now = moment().toISOString()
// console.log("=====> now: ", now);


import R, { trim, uniq } from 'ramda'
//
// let opt = {
//   select: ['subscriptionDay', 'tripCount', 'statisticAt']
// }
//
// let res = f1(opt)
// console.log('=====> res: ', res)
//
// function f1(option: { select: string[] }) {
//   const selectColumns = option === undefined ? [] : R.uniq(option.select).map(R.trim)
//
//   if (selectColumns.length === 0 || selectColumns.length === 1 && option.select[0] === '*') {
//     return '*'
//   }
//   return selectColumns.map((c) => `\"${c}\"`).join(',')
//
// }
//

function typeCovert(kqlType: string, input: string | number) {
  switch(kqlType) {
     case `STRING KEY`: {
       return input.toString()
     }
    case `STRING`: {
      return input.toString()
    }
    case `INTEGER`: {
       return parseInt(<string>input)
     }
    case `TIMESTAMP`: {
      return new Date(input)
    }
    default: {
        break;
     }
  }
}


let cols = ["452452", 300, 20, "2023-09-19T15:59:59.000"];

// let res2 = {};
// for (const a3Element of aaaa) {
//   res2[a3Element.column] = a3Element.type;
// }

// res2;




interface parseSchemaResult {
  column: string
  type: string
}


/**
 *
 * input:
 * "`id` STRING KEY, `subscriptionDay` INTEGER, `tripCount` INTEGER, `statisticAt` TIMESTAMP"
 *
 * output:
 * [
 *    { column: "id", type: "STRING" },
 *    { column: "subscriptionDay", type: "INTEGER" },
 *    { column: "tripCount", type: "INTEGER" },
 *    { column: "statisticAt", type: "TIMESTAMP" },
 *  ]
 */
let colsAndTypeList = parseKqlSchema(
  "`id` STRING KEY, `subscriptionDay` INTEGER, `tripCount` INTEGER, `statisticAt` TIMESTAMP"
)  as parseSchemaResult[]

let res:{[p: string]: string} = {}
for (let i = 0; i < colsAndTypeList.length; i++) {
  let key = colsAndTypeList[i].column
  // @ts-ignore
  res[key] = typeCovert(colsAndTypeList[i].type, cols[i])
}

console.log('res', res)



for (const colsAndType of colsAndTypeList) {
  console.log("colsAndType", colsAndType);
}

function parseKqlSchema(schema: string): ({ [key: string]: string; } | undefined)[] {
  return schema
    .split(",")
    .map(
      (s) =>
        /`(?<column>\w+)`\s+(?<type>STRING|INTEGER|TIMESTAMP)/.exec(s)?.groups
    );
}
