import moment from 'moment'

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


function tableNameToEntity(tableName: string) {
  return tableName[0].toUpperCase() + tableName.slice(1) + 'Entity'
}


interface KqlGetOption<Entity> {
  select?: (keyof Entity)[];
  where?: object;
}

function checkOperator(value: string | number) {
  console.log('=====> value: ', value)
  if (typeof value === `string`) {
    if (value[0] === '>' || value[0] === '<') {
      return [value[0], value.slice(1)]
    }
  }

  return ['=', value]
}


function findOneByIdV5<Entity extends BaseKsqlEntity>(
  id: string, tableName: string, option?: KqlGetOption<Entity>) {


  let whereString = ''
  if (!R.isNil(option) && !R.isNil(option.where)) {
    const whereKeyValue = option.where
    console.log('qq1', whereKeyValue)

    for (const [key, val] of Object.entries(whereKeyValue)) {

      const valAfter = checkOperator(val) as [string, number | string]
      console.log('=====> valAfter: ', valAfter)

      if (typeof val === 'string') {
        whereString += ` and ` + `\"${key}\" ${valAfter[0]} \'${valAfter[1]}\'`
      } else {
        whereString += ` and ` + `\"${key}\" ${valAfter[0]} ${valAfter[1]}`
      }
    }

  }

  const data = {
    /* eslint-disable-next-line no-useless-escape */
    ksql: `SELECT ` + 'id' + ` FROM "${tableName}" WHERE "id" = \'${id}\'${whereString};`
  }
  console.log('=====> data: ', data)


}


function kql_MoreThan(date: Date) {
  return '>' + moment(date).toISOString()
}

// '2023-09-29T00:41:15.898Z'

//
// findOneByIdV5(
//   '201212',
//   'userAchievement', {
//     where: {
//       subscriptionDay: 23,
//       expiredAt: kql_MoreThan(new Date())
//     }
//   })

// findOneByIdV5(
//   '201212',
//   'userAchievement')


// findOneByIdV5(
//   '201212',
//   'userAchievement', {
//     where: {
//       subscriptionDay: 23
//     }
//   })

//
// findOneByIdV5(
//   '201212',
//   'userAchievement', {
//     where: {
//       id: '201212'
//     }
//   })


// await db.term.findOne({ where: { id: termId, beginAt: MoreThan(new Date()) } })

// findOneByIdV4('201212', 'userAchievement', {
//   where: `expiredAt > ${now}`
// })

// findOneByIdV4('201212', 'userAchievement')
