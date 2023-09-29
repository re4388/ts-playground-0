// const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
//
// arr.reverse();
//
// // 單位應該是byte
// // 1024 -> kb
// // 1024 -> mb
// // heapUsed: proc 實際用的 heap
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
//
//
// console.log("=====> used: ", used);
//
// // Math.round(used * 100) / 100 小數點只顯示第二位的技巧, 如果要第三位就是 兩個都改為 1000
// console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);


///////////////

let arr = Array(1e6).fill("some string");
arr.reverse();
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${used} MB`);




