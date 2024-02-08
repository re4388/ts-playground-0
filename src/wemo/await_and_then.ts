async function irisControl(ms: number) {
  // <-- 參數帶進來
  return new Promise((resolve, reject) => {
    // setTimeout 非同步呼叫
    setTimeout(() => {
      resolve(new Date()) //
    }, ms) // <-- 因為參數要被 setTimeOut 使用
  })
}

async function main() {
  console.log('1')

  // 這邊如果不加上 await, 就不會等，2, 3 就會直接跑!
  await irisControl(1000)
    .then((res) => {
      if (res) {
        console.log('------->res: ', res)
      }
    })
    .catch((error: Error) => {
      console.log(error)
    })

  console.log('2')
  console.log('3')
}

main()
