import os from 'os'
// CPU 的字節序
console.log('endianness : ' + os.endianness())  // LE

// 操作系統名
console.log('type : ' + os.type()) // Darwin

console.log('=====> os.tmpdir(): ', os.tmpdir())
// 返回操作系統的默認臨時文件夾。
// /var/folders/wg/n5qlxj6d6590mh82glqhhm280000gn/T

console.log('=====> os.hostname(): ', os.hostname()) // HudeMacBook-Air.local
// 返回操作系統的主機名。

os.platform()
console.log('=====> os.platform(): ', os.platform()) // darwin
// 返回編譯時的操作系統名	Link
os.arch()
console.log('=====> os.arch(): ', os.arch()) // arm64
// 返回操作系統 CPU 架構，可能的值有 “x64”、”arm” 和 “ia32”。	Link
os.release()
console.log('=====> os.release(): ', os.release()) // 22.4.0
// 返回操作系統的發行版本。	Link
os.uptime()
console.log('=====> os.uptime(): ', os.uptime()) // 4409942
// 返回操作系統運行的時間，以秒為單位。
console.log('min: ',os.uptime() / 60)


// 系統內存總量
console.log('total memory : ' + os.totalmem() + ' bytes.')

// 操作系統空閒內存量
console.log('free memory : ' + os.freemem() + ' bytes.')

// total memory : 25 769 803 776 bytes.
//  free memory :     79 265 792 bytes.


console.log('networkInterfaces: ', os.networkInterfaces())
