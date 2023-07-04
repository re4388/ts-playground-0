import path from 'path'
import { fileURLToPath, URL } from 'url'
import { homedir } from 'os'



let a3 = path.resolve(homedir(), ".knode")
// console.log("=====> a3: ", a3); // /Users/re4388/.knode
// homedir() 直接可以你家路徑, in my case => /Users/re4388
// path.resolve 讓你跟其他路徑連在一起



const a1 = fileURLToPath(new URL(import.meta.url))
// console.log("=====> a1: ", a1);
// /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS_doc_js/a1.mjs
// 可以拿到這個檔案的絕對路徑


const fullPath = path.dirname(fileURLToPath(new URL(import.meta.url)));
// console.log("=====> fullPath: ", fullPath);
// /Users/re4388/project/personal/nodets/ts-playground-0/src/nodeJS_doc_js
// 可以拿到這個檔案的絕對路徑下的 dir 路徑（就是把檔名拿段那掉）


// node a1.mjs