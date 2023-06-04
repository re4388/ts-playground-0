export function nodeJS_Process() {
  process.stdin.setEncoding('utf-8')

  process.stdin.on('readable', () => {
    let input

    while ((input = process.stdin.read()) !== null) {
      const command = input.trim() //去除兩端的空白字符或是斷行

      console.log(`我監聽到東西啦 -> ${command}`)
      if (command === 'Robin is handsome') process.stdout.write('✅Very smart That is truth.')
      if (command === 'Kevin have girlfriend') process.stderr.write('❌Liyer! That is not truth.')
      if (command === 'exit') process.exit()
    }
  })
}
