

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}


let list1 = [99, 11, 22, 33, 1, 2, 3, 4, 5, 0, -3]

let res = qk(list1)
console.log('=====> res: ', res)

function qk(arr) {
  let i = 0
  let j = arr.length - 1
  dfs(arr, i, j)
  return arr
}

function dfs(arr, i, j) {

  let newMiddle

  newMiddle = _split(arr, i, j)
  // 錯誤，沒有把 newMiddle 減一 , off-one error
  // 沒有減一，你不就重複把middle 放在兩邊了嗎？


  //           m
  // idx   0 1 2 3 4
  //      [1,2,3,4,5]


  // 這個是 dfs(arr, 0, 1)
  if (i < newMiddle - 1) dfs(arr, i, newMiddle - 1)
  // 這個是 dfs(arr, 2, 4)
  if (newMiddle < j) dfs(arr, newMiddle, j)

  return arr
}


function _split(arr, l, r) {
  let pivot = arr[Math.floor((l + r) / 2)]

  // go thru each ele
  while (l <= r) {

    // skip if it is in the correct pos
    while (arr[l] < pivot) {
      l++
    }

    // skip if it is in the correct pos
    while (arr[r] > pivot) {
      r--
    }

    // swap

    // 錯誤，沒有加上等於的條件, off-one error
    // 等於的情況， swap 後的 l++ and r--
    // 讓你脫離上面的 while (l <= r)
    // 不然你不就卡在 l===r 的情況下，然後一直會進來嗎？
    if (l <= r) {
      swap(arr, l, r)
      l++
      r--
    }
  }

  return l
}

