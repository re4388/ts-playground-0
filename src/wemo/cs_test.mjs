import axios from 'axios'
import FormData from 'form-data'

// run:
// watch -n 3 node cs_test.mjs

let data = new FormData();
data.append('items', genFakeData());

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3007/v21/customerIssues/rents/2459137/items',
  headers: {
    'Authorization': 'WeMo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDA3MTIiLCJ1c2VyX2lkIjoiMjAwNzEyIiwiaWF0IjoxNjkyMTU5MzI2NzAzLCJleHAiOjE2OTIzMzIxMjY3MDN9.VYjEnWS9EgTrYeFRYgJy73Y2U6D8clxLuEyWCiFwKpY',
    ...data.getHeaders()
  },
  data : data
};

axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });



function genFakeData() {


  let list1 = [
    "HEAD_LIGHT",
    "SIDE_LIGHT_LEFT",
    "SIDE_LIGHT_RIGHT",
    "MIRROR_LEFT",
    "MIRROR_RIGHT",
    "BRAKE_LEFT",
    "BRAKE_RIGHT",
    "HELMET_L_MISSING_OR_BROKEN",
    "HELMET_S_MISSING_OR_BROKEN",
    "HELMET_L_LENS",
    "SANITARY_NET",
    "CLEANING_CLOTH",
    "TRUNK_WITH_A_CLICK",
    "SEAT",
    "MIRROR_LEFT_SCREW",
    "MIRROR_RIGHT_SCREW",
    "BRAKE_HANDLE_LEFT",
    "BRAKE_HANDLE_RIGHT",
    "HELMET_L_BUCKLE",
    "HELMET_S_BUCKLE",
    "HELMET_L_STINK",
    "HELMET_S_STINK",
    "SANITARY_NET_BAG",
    "TRUNK_WITHOUT_A_CLICK",
    "CENTER_STAND",
    "KICK_STAND",
    "FRONT_TIRE_PRESSURE",
    "FRONT_TIRE_FLAT",
    "REAR_TIRE_PRESSURE",
    "REAR_TIRE_FLAT",
    "ADDITIONAL_L_HELMET",
    "ADDITIONAL_S_HELMET",
    "TRUNK_CANNOT_LOCK",
  ]

  const numberOfItem = Math.ceil(Math.random() * 5)

  let res = []
  for(let i=0; i<numberOfItem;i++){
    const numberOfIdx = Math.ceil(Math.random() * 34) - 1
    res.push(list1[numberOfIdx])
  }
  console.log("res", res);

  let resSliced = res.slice(0,2)

  let res2 = resSliced.join(',')
  console.log("res2", res2);




  return res2

}
