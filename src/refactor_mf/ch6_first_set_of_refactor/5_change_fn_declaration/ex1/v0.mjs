// Again, I have this function with its overly abbreved name:
function circum(radius) {
  return 2 * Math.PI * radius
}

// migration mechanics:
// I begin by applying Extract Function (106) to the entire function body.
// 用原本的 api 包住改的
// 這樣 client side 不會掛
// 等到全部 client 都更新好了，再移除
function circum(radius) {
  return circumference(radius)
}

function circumference(radius) {
  return 2 * Math.PI * radius
}


/**
 * I test that, then apply Inline Function (115) to the old functions.
 *
 * I find all the calls of the old function and replace each one with a call of the new one. I can test after each change, which allows me to do them one at a time. Once I’ve got them all, I remove the old function.
 *
 * With most refactorings, I’m changing code that I can modify, but this refactoring can be handy with a published API — that is, one used by code that I’m unable to change myself.
 *
 * I can pause the refactoring after creating circumference and, if possible, mark circum as deprecated. I will then wait for callers to change to use circumference; once they do, I can delete circum. Even if I’m never able to reach the happy point of deleting circum, at least I have a better name for new code.
 */

function apiV0(radius) {
  return 2 * Math.PI * radius
}

// 不會 break client, 還是有 apiV0 可以呼叫
// 不過這裡沒有處理 return value 的相容
function apiV0(radius) {
  return apiV1(radius)
}

function apiV1(radius) {
  return 2 * Math.PI * radius
}
