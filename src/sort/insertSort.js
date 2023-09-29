let data = [8, 6, 10, 5, 3, 9, 2, 7, 4, 1]



// 一個指針往右走, 外圍的 for loop, 從 idx 1 開始
// 另一個指針內部用 兩個兩個比往前比大小，看要不要 swap, 往前走
const insertionSort = (arr) => {
  // 從index 1 開始去判斷要不要去swap, 因此從 1 開始
  // 看動畫就知道為何了 https://leetcode.com/explore/learn/card/sorting/694/comparison-based-sorts/4435/
  for (let i = 1; i < arr.length; i++) {

    // init next ptr, 從 i 開始
    let next = i;

    // 先把要插入的元素存起來
    const nextEle = arr[i];

    // 最後就會抵達 可以update/插入的位置
    while (arr[next - 1] > nextEle) {
      // 如果上一個 ele 比較大，因為我們要升序排列，這邊就 swap
      [arr[next], arr[next - 1]] = [arr[next - 1], arr[next]];
      // next 往前
      next--;

      // 上面兩個是會一直處理直到"上一個ele沒有比較大"
    }

    // 找到，update/插入 元素
    // 如果目前的 nextEle比前面的都大，那 next 就不會 -- 因此就自己insert在在自己本來的位置
    // 其實，上面的 while loop, 如果遇到上一個比較大的情境，就會已經 swap了
    // 因此，程式跑到這邊，基本上就是把 nextEle放在 最後一個 "while比較完的位置", 這個位置就是前面都是比較小的了
    arr[next] = nextEle;
  }

  // 以上跑完就可以了
  return arr;
}

console.log(insertionSort(data))//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
