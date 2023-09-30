

import moment from 'moment';

export abstract class BaseKsqlEntity {
  [index: string]: unknown
}

export class UserAchievementsEntity extends BaseKsqlEntity {
  id: string | undefined
  subscriptionDay: number | undefined
  tripCount: number | undefined
  statisticAt: Date | undefined
  updatedAt: Date | undefined
  expiredAt: Date | undefined
}

// interface UserAchievementsEntity extends BaseKsqlEntity {
//   id: string
//   subscriptionDay: number
//   tripCount: number
//   statisticAt: Date
//   updatedAt: Date
//   expiredAt: Date
// }



import R, { trim, uniq } from 'ramda'

interface KqlGetOption<Entity> {
  select?: (keyof Entity)[];
  where?: string;
}



function tableNameToEntity(tableName: string) {
  return tableName[0].toUpperCase() + tableName.slice(1) + 'Entity'
}

function parseWhere<Entity>(option: KqlGetOption<Entity> | undefined) {
  let whereClauses = ''
  if (!R.isNil(option) && !R.isNil(option.where)) {
    const multipleWhereClauses = option.where.split('and').map(R.trim)
    for (const whereClause of multipleWhereClauses) {
      whereClauses += ` and ` + parseOneWhereClause<Entity>(whereClause)
    }
  }

  return whereClauses
}




function findOneByIdV4<Entity extends BaseKsqlEntity>(id: string, tableName: string, option?: KqlGetOption<Entity>){
  let whereString = ''
  let validWhereClause = ''


  // let entityName = tableNameToEntity(tableName)
  // let a2: UserAchievementsEntity['subscriptionDay']
  //
  // // @ts-ignore
  // console.log("=====> a2: ", typeof a2);


  const whereClauses = parseWhere<Entity>(option)


  if(!R.isNil(option) && !R.isNil(option.where)) {

    const multipleWhereClauses = option.where.split('and').map(R.trim)
    for (const whereClause of multipleWhereClauses) {
      validWhereClause += ` and ` + parseOneWhereClause(whereClause)
    }
    console.log("=====> multipleWhereClauses: ", multipleWhereClauses);
  }

  whereString = validWhereClause


  //  goal
  // `SELECT id FROM "userAchievement" WHERE "id" = '201212' and "expiredAt" > '2023-09-29T00:41:15.898Z' ;`

  const data = {
    /* eslint-disable-next-line no-useless-escape */
    ksql: `SELECT ` + "id" + ` FROM "${tableName}" WHERE "id" = \'${id}\'${whereString} ;`
  }
  console.log("=====> data: ", data);

}


function parseOneWhereClause<Entity>(input: string) {
  console.log("=====> input: ", input);
  const optionArr = input.split(' ')
  if(R.isNil(optionArr)) throw new Error('parse parseOneWhereClause error')


  const col = optionArr[0]
  const operator = optionArr[1]
  const value = optionArr[2]
  const type  = typeof value
  console.log("=====> type: ", type);
  return `\"${col}\" ${operator} ${toKqlStringOrNumForWhere(value, type)}`
}

function toKqlStringOrNumForWhere(input: number | string, type: number | string) {
  switch(type) {
    case `string`: {
      return `\'${input}\'`
    }
    case `number`: {
      return `${input}`
    }
    default: {
      break;
    }
  }
}



const now = moment().toISOString()
findOneByIdV4('201212', 'userAchievement', {
  where: `expiredAt > ${now} and subscriptionDay === 23`
})

findOneByIdV4('201212', 'userAchievement', {
  where: `expiredAt > ${now} and subscriptionDay === 23`
})


function kql_MoreThan(date: Date) {
  return moment(date).toISOString()
}

// '2023-09-29T00:41:15.898Z'




// findOneByIdV4({
//   where: {
//     id: '201212',
//     subscriptionDay: 23,
//     expiredAt: kql_MoreThan(new Date())
//   }
// })


// await db.term.findOne({ where: { id: termId, beginAt: MoreThan(new Date()) } })

// findOneByIdV4('201212', 'userAchievement', {
//   where: `expiredAt > ${now}`
// })

// findOneByIdV4('201212', 'userAchievement')
