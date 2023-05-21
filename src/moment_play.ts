import moment from "moment-timezone";

export function momentPlay() {
  let a1 = moment().tz("Asia/Taipei").format();
  console.log("a1", a1); // 2023-05-20T18:24:33+08:00

  ////////// Getting all Zones

  let allZones = moment.tz.names();
  // console.log("allZones", allZones);

  let res1 = allZones.filter((z) => z.includes("Taipei"));
  console.log("res1", res1);
  // res1 [ 'Asia/Taipei' ]

  let res2 = moment.tz.zonesForCountry("CN", true);
  console.log("res2", res2);
  // res2 [
  //     { name: 'Asia/Shanghai', offset: -480 }, // 概念上表示， -480 min or -8 hr 會等於 UTC (因為我們這邊快 8 hr)
  //     { name: 'Asia/Urumqi', offset: -360 }
  //   ]
}
