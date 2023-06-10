import { log } from 'console'
import moment from 'moment-timezone'

export function momentPlay() {
  t4()
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
