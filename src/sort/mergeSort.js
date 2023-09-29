let data = [8, 6, 10, 5, 3, 9, 2, 7, 4, 1]
let res = sortArray(data)
console.log('=====> res: ', res)

function sortArray(nums) {
  mergeSort(nums)
  return nums

  function mergeSort(nums) {
    // no need to sort when we only have 0, 1 in len
    if (nums.length <= 1) {
      return
    }

    let m = Math.floor(nums.length / 2)
    let lArr = nums.slice(0, m)
    let rArr = nums.slice(m)

    // 錯誤點：
    // 這邊的遞迴，並沒有要使用到return後的東西（看第一行）
    // 因此寫法也不會是下面comment掉的那兩行
    // 要return的話，會是另一種處裡

    // 先切到剩下一個或沒有
    mergeSort(lArr)
    mergeSort(rArr)

    // let lArr = mergeSort(l)
    // let rArr = mergeSort(r)

    let i = 0
    let j = 0
    let k = 0

    // 2 ptr for left and right
    // k ptr is for nums arr
    while (i < lArr.length && j < rArr.length) {
      // order in ASC, so if we find smaller one
      // assign to nums[k]
      // after assignment, we can move k and i(which being assign) by 1
      if (lArr[i] < rArr[j]) {
        nums[k] = lArr[i]
        k += 1
        i += 1
      } else {
        nums[k] = rArr[j]
        k += 1
        j += 1
      }
    }

    while (i < lArr.length) {
      nums[k] = lArr[i]
      k += 1
      i += 1
    }

    while (j < rArr.length) {
      nums[k] = rArr[j]
      k += 1
      j += 1
    }

  }

}
