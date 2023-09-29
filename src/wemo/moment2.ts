

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

function findOneByIdV2(id: string, tableName: string, option?: KqlGetOption<UserAchievementsEntity>) {
  let whereString = ''
  if(!R.isNil(option?.where)) {
    whereString = `and ` + option?.where
  }



  const data = {
    /* eslint-disable-next-line no-useless-escape */
    ksql: `SELECT ` + "id" + ` FROM "${tableName}" WHERE "id" = \'${id}\' ${whereString} ;`
  }
  console.log("=====> data: ", data);

}

const now = moment().toISOString()
findOneByIdV2('201212', 'userAchievement', {
  where: `"expiredAt" > \'${now}\'`
})

// findOneByIdV2('201212', 'userAchievement')
