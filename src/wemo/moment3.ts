

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
import R, { trim, uniq } from 'ramda'

interface KqlGetOption<Entity> {
  select?: (keyof Entity)[];
  where?: string;
}

function findOneById(id: string, tableName: string, option?: KqlGetOption<UserAchievementsEntity>) {

    const data = {
      /* eslint-disable-next-line no-useless-escape */
      ksql: `SELECT ` + "id" + ` FROM "${tableName}" WHERE "id" = \'${id}\' and "expiredAt" > \'${now}\';`
    }
    console.log("=====> data: ", data);

}

function findOneByIdV3(id: string, tableName: string, option?: KqlGetOption<UserAchievementsEntity>) {
  let whereString = ''
  if(!R.isNil(option?.where)) {
    const optionArr = option?.where.split(' ')
    if(R.isNil(optionArr)) throw new Error('parse error')

    const col = optionArr[0]
    const operator = optionArr[1]
    const value = optionArr[2]
    whereString = `and ` + `\"${col}\" ${operator} \'${value}\'`
  }


  //  goal
  // `SELECT id FROM "userAchievement" WHERE "id" = '201212' and "expiredAt" > '2023-09-29T00:41:15.898Z' ;`

  const data = {
    /* eslint-disable-next-line no-useless-escape */
    ksql: `SELECT ` + "id" + ` FROM "${tableName}" WHERE "id" = \'${id}\' ${whereString} ;`
  }
  console.log("=====> data: ", data);

}

const now = moment().toISOString()
findOneByIdV3('201212', 'userAchievement', {
  where: `expiredAt > ${now}`
})

// findOneByIdV2('201212', 'userAchievement')
