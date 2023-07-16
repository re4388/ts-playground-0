



function waitInMs(ms){
  return new Promise((resolve, reject)=>{
    return setTimeout(resolve, ms)
  })
}


async function run() {

  const a2 = await waitInMs(0)
  console.log("=====> a2: ", a2);
  console.log('2')
}

// run()


async function a1() {
  await 1
  console.log('23')
}



async function run2() {

  console.log('2')
  await a1()
}

run2()