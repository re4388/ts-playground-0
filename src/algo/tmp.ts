const l1 = [1, 2, 3, 42, -1, -3, -22, 0, 100, 23];

let l2 = quickSort(l1);
console.log("l2", l2);

function quickSort(arr: number[]) {
  let l = 0;
  let r = arr.length - 1;
  qk(l, r, arr);
  return arr;
}

function qk(l: number, r: number, arr: number[]) {
  let m;
  m = partition(l, r, arr);
  if (l < m-1) qk(l, m-1, arr);
  if (m < r) qk(m, r, arr);
}

function partition(l: number, r: number, arr: number[]) {
  let pivot = arr[Math.floor((l + r) / 2)];

  while (l <= r) {
    while (arr[l] < pivot) {
      l++;
    }

    while (arr[r] > pivot) {
      r--;
    }

    if (l <= r) {
      // swap
      let tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;

      l++;
      r--;
    }
  }

  return l;
}
