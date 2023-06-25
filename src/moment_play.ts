import { log } from 'console'
import moment from 'moment-timezone'

export function momentPlay() {
  t6()
  function t6() {
    const now = Date.now()
    console.log("=====> now: ", moment(now));
    const nowLocal = moment(now).utcOffset('+0800')
    console.log("=====> nowLocal: ", nowLocal);
    nowLocal.add(3, 'day').endOf('d') // 加三天然後又加到那天的23:59:59
    nowLocal.add(3, 'hour')
    console.log("=====> nowLocal: ", nowLocal);

  // =====> now:  1687332651870
  //   =====> nowLocal:  Moment<2023-06-24T23:59:59+08:00>

  }


// t5()
function t5() {
  function validMonth(month: string) {
    if (month === '') return false
    return month.match(/^[0-9]{4}-[0-9]{2}$/) !== null
  }

  const nowUTC = new Date()
  console.log('=====> nowUTC: ', nowUTC)

  // 切成台灣時間且減一個月
  let oneMonBefore = moment().utcOffset('+0800').subtract(1, 'M')
  console.log('=====> oneMonBefore: ', oneMonBefore)

  const month = '2023-06'
  if (month && validMonth(month)) {
    // 切成台灣時間
    // This forms a complete timestamp for the first day of the specified month at midnight, adjusted for the time zone UTC+8:00
    const nowModify = moment(`${month}-01 00:00:00+0800`).utcOffset('+0800')
    console.log('=====> nowModify: ', nowModify)
  }
}


// t4()
function t4() {
  const before = moment(new Date())
  console.log('before', before)
  const after = moment(new Date()).subtract(1, 'days').toDate()
  console.log('beginAt', after)
}

// t3();

function t3() {
  let a1 = '2023-05-29T06:44:59.999Z'

  console.log('moment(new Date()', moment(new Date()))
  console.log('a1', moment(a1))
  console.log(new Date())
  console.log(typeof new Date())

  console.log(moment.utc())
  // just use moment.utc()
  if (moment(new Date()).isAfter(moment(a1))) {
    console.log('q1')
  } else {
    console.log('q2')
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// t2()
function t2() {
  const start = new Date('2000-01-17T16:45:30')
  const end = new Date('2000-01-20T16:45:30')
  const now = new Date()

  const rangeDiff = moment(end).diff(start, 'day')
  console.log('rangeDiff', rangeDiff)

  const startAt = moment(start).tz('Asia/Taipei').startOf('day').toDate()
  const endAt = moment(end).tz('Asia/Taipei').endOf('day').toDate()
  const now1 = moment(now).tz('Asia/Taipei').endOf('day').toDate()
  console.log('startAt', startAt)
  console.log('endAt', endAt)
  console.log('now1', now1)
}

//////////////////////////////////////////////////////////////////////////////////////////////

// ////////// Getting all Zones
// t1()
function t1() {
  let a1 = moment().tz('Asia/Taipei').format()
  console.log('a1', a1) // 2023-05-20T18:24:33+08:00
  let allZones = moment.tz.names()
  // console.log("allZones", allZones);

  let res1 = allZones.filter((z) => z.includes('Taipei'))
  console.log('res1', res1)
  // res1 [ 'Asia/Taipei' ]

  let res2 = moment.tz.zonesForCountry('CN', true)
  console.log('res2', res2)
  // res2[
  // ({ name: "Asia/Shanghai", offset: -480 }, // 概念上表示， -480 min or -8 hr 會等於 UTC (因為我們這邊快 8 hr)
  // { name: "Asia/Urumqi", offset: -360 })
  // ];
}
}
