import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const isDeleteIsTrue = [
  895340,
  822733,
  967637,
  803427,
  951312,
]

const idCardStrange = [975767]

const userIdList = [
  881778,
  173552,
  396480,
  205849,
  52653,
  798277,
  495119,
  924007,
  863452,
  843019,
  131426,
  48171,
  951313,
  130890,
  822431,
  895366,
  224028,
  135788
]


// let list1 = [1000135, 135788]

interface UserData {
  wScooterStatus: string;
}

const data: UserData = {
  wScooterStatus: 'FINISHED_ALLOW'
}


const waitInMs = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


run(userIdList)

async function run(ids: number[]) {


  for (const id of ids) {
    await waitInMs(1000)

    try {
      axios.request({
        method: 'patch',
        maxBodyLength: Infinity,
        url: `https://kottos.wemoscooter.com/v23/users/${id}`,
        headers: {
          'Authorization': 'Manager eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NjkiLCJ1c2VyX2lkIjoiNTY5IiwidGVuYW50SWQiOjEwLCJwZXJtaXNzaW9ucyI6IltcIjI4XCIsXCI2OVwiLFwiMzJcIixcIjM4XCIsXCIzOVwiLFwiMzdcIixcIjM1XCIsXCI2NlwiLFwiOTlcIixcIjY3XCIsXCI3N1wiLFwiMzNcIixcIjkwXCIsXCI4NVwiLFwiNzhcIixcIjMxXCIsXCI4MVwiLFwiOTFcIixcIjJcIixcIjdcIixcIjQxXCIsXCIxOVwiLFwiOTNcIixcIjExN1wiLFwiMjFcIixcIjkyXCIsXCIxMTlcIixcIjEyXCIsXCI4MlwiLFwiODBcIixcIjk2XCIsXCIxMTNcIixcIjVcIixcIjg0XCIsXCIyOVwiLFwiMTIwXCIsXCIxOFwiLFwiMTI0XCIsXCIxMDZcIixcIjZcIixcIjc1XCIsXCIxMDNcIixcIjExOFwiLFwiMTEwXCIsXCI5XCIsXCI4M1wiLFwiOTVcIixcIjc5XCIsXCIxMDRcIixcIjhcIixcIjEzN1wiLFwiMzRcIixcIjg5XCIsXCIxMDdcIixcIjEwXCIsXCIxMzZcIixcIjExXCIsXCIxMzhcIixcIjEwMVwiLFwiM1wiLFwiMzBcIl0iLCJpYXQiOjE3MDM2NDYzNDIsImV4cCI6MTcwMzY4MjM0Mn0.MkA64Foi5BR_e8b5raRdyel1Ae1mY-FjzkoJ7ZGM-y4',
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
      }).then((response: AxiosResponse) => {
        console.log(id + ' success')
        console.log(JSON.stringify(response.data))
      })
    } catch (error) {
      console.log(id + ' error')
      // @ts-ignore
      console.log("------->error: ", error);
      throw error
    }


  }


}


const successList = [734416,
  237,
  335408,
  85730,
  902817,
  489405,
  27627,
  12093,
  21231,
  639197,
  796338,
  371347,
  883139,
  949446,
  930363,
  426419,
  236971,
  42940,
  786607,
  935189,898848, 9,
  71886,
  951365,
  489435,
  203568,
  622814,
  969431,
]



const all_list = [
  895340,
  71886,
  951365,
  489435,
  203568,
  822733,
  622814,
  969431,
  967637,
  803427,
  951312,
  975767,
  881778,
  173552,
  396480,
  205849,
  52653,
  798277,
  495119,
  924007,
  863452,
  843019,
  131426,
  48171,
  951313,
  130890,
  822431,
  895366,
  224028,
  135788,
  1000135
]
