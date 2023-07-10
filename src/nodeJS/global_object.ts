// 輸出當前目錄
console.log('當前目錄: ' + process.cwd())
// 當前目錄: /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS

// 輸出當前版本
console.log('當前版本: ' + process.version)
// 當前版本: v18.12.1

// process.memoryUsage() 方法遍历每个 page 以收集有关内存使用情况的信息
// 会根据程序内存分配而变慢。
// unit is byte
// ref: https://nodejs.cn/api/process/process_memoryusage.html
console.log(process.memoryUsage())

//  rss: 243 974144,
// Resident Set Size
// is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process,
// including all C++ and JavaScript objects and code.


//   heapTotal: 151 191552,
//   heapUsed: 123 626680,
// V8's memory usage.


//   external: 21 02326,
// there's some c++ object (so we call this external) used for node.js
// adn this is the mem usage for those c++ object
// these are also mgm by v8


//   arrayBuffers: 896 678
// refers to memory allocated for ArrayBuffers and SharedArrayBuffers,
// including all Node.js Buffers.
// This is also included in the external value.
// When Node.js is used as an embedded library,
// this value may be 0 because allocations for ArrayBuffers may not be tracked in that case.

// }


// 輸出到終端
process.stdout.write('Hello World!' + '\n')
// Hello World!

// 通過參數讀取
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val)
})
// 0: /Users/re4388/.nvm/versions/node/v18.12.1/bin/ts-node
// 1: /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS/global_object.ts


// 獲取執行路徑
console.log(process.execPath)
// /Users/re4388/.nvm/versions/node/v18.12.1/bin/node

// 平台訊息
console.log(process.platform)
// darwin



  console.info("開始執行：");

var counter = 10;
console.log("計數: %d", counter);

console.time("獲取資料");
//
// 執行一些程式
//
console.timeEnd('獲取資料');

console.info("執行完畢。")



console.log(__filename);
// /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS/global_object.ts

console.log(__dirname);
// /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS




process.on('exit', function(code) {

  // 以下程式永遠不會執行
  setTimeout(function() {
    console.log('該程式不會執行')
  }, 0)

  console.log('退出碼為:', code)
})
console.log('執行結束')